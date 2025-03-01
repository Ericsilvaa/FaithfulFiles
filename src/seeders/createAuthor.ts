import { supabase } from "../config/supabaseClient";
import { AppDataSource } from "../database/dataSource";
import { Author } from "../entities/books/authors.entity";

export const createAuthor = async () => {
  const author = Author.create({
    name: "João Calvino",
    country: "França",
    birth_date: new Date("1509-07-10"),
    death_date: new Date("1564-05-27"),
    bio: "João Calvino foi um teólogo e pastor influente na Reforma Protestante.",
  });
  console.log("🚀 ~ createAuthor ~ author:", author);

  await supabase.from("authors").insert(author);

  return author;
};

export const getAuthorByName = async (name: string): Promise<Author | null> => {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.error("❌ Erro ao buscar autor:", error);
    return null;
  }

  return data as Author;
};
