import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
import { SupabaseClient } from "@supabase/supabase-js";

export class AuthController {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async registerUser(req: Request, res: Response) {
    const { email, name, password } = req.body;

    try {
      const { data: authUser, error: authError } =
        await this.supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

      if (authError || !authUser.user) {
        return responseHandler({
          res,
          status: 400,
          message: authError?.message || "Erro ao criar usuário!",
        });
      }

      const { data: newUser, error: insertError } = await this.supabase
        .from("users")
        .upsert(
          [
            {
              auth_id: authUser.user.id,
              email,
              name,
              last_login: authUser.user.last_sign_in_at,
            },
          ],
          { onConflict: "auth_id" },
        )
        .select()
        .single();

      if (insertError) {
        return responseHandler({
          res,
          status: 500,
          message: "Erro ao criar usuário no banco de dados!",
          error: insertError,
        });
      }

      const data = {
        id: newUser.id,
        auth_id: authUser.user.id,
        email: newUser.email,
        name: newUser.name,
      };

      return responseHandler({
        res,
        status: 201,
        message: "Usuário registrado com sucesso!",
        data,
      });
    } catch (error) {
      return responseHandler({
        res,
        status: 500,
        message: "Erro interno do servidor!",
        error,
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // 🔹 Autenticação via Supabase Auth
      const { data: authUser, error: authError } =
        await this.supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authUser.user || !authUser.session) {
        return responseHandler({
          res,
          status: 401,
          message: authError?.message || "Credenciais inválidas!",
        });
      }

      // 🔹 Gerando os dados para atualização
      const auth_id = authUser.user.id;
      const auth_token = authUser.session.access_token;
      const last_login = new Date().toISOString();
      const name = authUser.user.user_metadata?.name || "Usuário";

      const { error: updateError } = await this.supabase
        .from("users")
        .upsert(
          [
            {
              auth_id,
              email,
              name,
              auth_token,
              last_login,
            },
          ],
          { onConflict: "auth_id" },
        ) // 🔹 Se já existir, apenas atualiza
        .select()
        .single();

      if (updateError) {
        return responseHandler({
          res,
          status: 500,
          message: "Erro ao atualizar os dados do usuário no banco de dados!",
          error: updateError,
        });
      }

      // 🔹 Retornando os dados do usuário autenticado
      return responseHandler({
        res,
        status: 200,
        message: "Cliente logado com sucesso!",
        data: {
          auth_id,
          email,
          name,
          auth_token,
          last_login,
        },
      });
    } catch (error) {
      return responseHandler({
        res,
        status: 500,
        message: "Erro interno do servidor!",
        error,
      });
    }
  }
}
