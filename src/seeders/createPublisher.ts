import { supabase } from "../config/supabaseClient";
import { AppDataSource } from "../database/dataSource";
import { Publisher } from "../entities/books/publishers.entity";

export const createPublisher = async () => {
  // const publisherRepository = AppDataSource.getRepository(Publisher);

  const publisher = Publisher.create({
    name: "Editora Reformada",
    country: "Brasil",
    website: "https://editorareformada.com",
  });

  // await publisherRepository.save(publisher);
  await supabase.from("authors").insert(publisher);

  return publisher;
};

export const getPublisherByName = async (
  name: string,
): Promise<Publisher | null> => {
  const { data, error } = await supabase
    .from("publishers")
    .select("*")
    .eq("name", name)
    .single();

  if (error) {
    console.error("❌ Erro ao buscar editora:", error);
    return null;
  }

  return data as Publisher;
};
