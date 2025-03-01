import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { UserRoleType } from "../../entities/users/user_roles.entity";

/**
 * Supabase Client Initialization
 */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export default class Auth {
  /**
   * Middleware to check if the request has a valid authentication token.
   */
  static async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          error: true,
          message: "Authentication required. Please log in.",
        });
      }

      const [bearer, token] = authHeader.split(" ");
      if (!token || bearer.toLowerCase() !== "bearer") {
        return res.status(401).json({
          error: true,
          message: "Invalid token format.",
        });
      }

      // ✅ Validate token using Supabase
      const { data: supabaseUser, error } = await supabase.auth.getUser(token);
      if (error || !supabaseUser?.user) {
        return res.status(403).json({
          error: true,
          message: "Invalid or expired token.",
        });
      }

      // ✅ Fetch user details from Supabase (Fetching a Single Role)
      const { data: userRecord, error: userError } = await supabase
        .from("users")
        .select("id, email, name, role") // ✅ Fetch single role
        .eq("email", supabaseUser.user.email)
        .single();

      if (userError || !userRecord) {
        return res.status(404).json({
          error: true,
          message: "User not found in the system.",
        });
      }

      // ✅ Attach user data to request object
      req.user = {
        id: userRecord.id,
        email: userRecord.email,
        name: userRecord.name,
        role: userRecord.role as UserRoleType,
      };

      next();
    } catch (error) {
      console.error("Authentication Error:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
    }
  }

  /**
   * Middleware to check if the user has the required role(s).
   */
  static authorizeRoles(allowedRoles: UserRoleType[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(403).json({
          error: true,
          message: "Unauthorized. Please log in.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: true,
          message: "Access denied. Insufficient permissions.",
        });
      }

      next();
    };
  }
}
