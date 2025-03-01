import { AppDataSource } from "../database/dataSource";
import { Author } from "../entities/books/authors.entity";
import { Book, BookStatus, Language } from "../entities/books/books.entity";
import { Category } from "../entities/books/categories.entity";
import { Publisher } from "../entities/books/publishers.entity";

export const createBook = async () => {
  const bookRepository = AppDataSource.getRepository(Book);
  const authorRepository = AppDataSource.getRepository(Author);
  const categoryRepository = AppDataSource.getRepository(Category);
  const publisherRepository = AppDataSource.getRepository(Publisher);

  // 📌 Buscando autor, categoria e editora existentes
  const author = await authorRepository.findOne({
    where: { name: "João Calvino" },
  });
  const category = await categoryRepository.findOne({
    where: { name: "Teologia" },
  });
  const publisher = await publisherRepository.findOne({
    where: { name: "Editora Reformada" },
  });

  if (!author || !category || !publisher) {
    throw new Error("Autor, categoria ou editora não encontrados!");
  }

  // 📌 Criando um novo livro
  const book = bookRepository.create({
    title: "As Institutas da Religião Cristã",
    isbn: "1234567890123",
    published_year: 1559,
    page_count: 1200,
    description: "Uma das obras mais importantes da teologia reformada.",
    language: Language.PORTUGUESE,
    edition: "Edição Especial",
    acquired_at: new Date(),
    total_copies: 10,
    available_copies: 10,
    status: BookStatus.AVAILABLE,
    library_code: "BIB-001",
    author,
    category,
    publisher,
  });

  await bookRepository.save(book);
  return book;
};
