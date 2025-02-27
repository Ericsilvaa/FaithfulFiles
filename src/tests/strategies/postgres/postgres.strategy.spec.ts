import { dbDataSourcePostgres } from "../../../database/db/dataSource";
import ContextStrategy from "../../../database/strategies/base/context.strategy";
import PostgresStrategy from "../../../database/strategies/postgres/postgres.strategy";
import { Author } from "../../../entities/books/authors.entity";
import {
  Book,
  BookStatus,
  Language,
} from "../../../entities/books/books.entity";
import { Category } from "../../../entities/books/categories.entity";
import { Publisher } from "../../../entities/books/publishers.entity";

const repository = PostgresStrategy.createRepository(
  dbDataSourcePostgres,
  "UserEntity",
);
const contextdb = new ContextStrategy(new PostgresStrategy(repository));

export const MOCK_AUTHOR: Author = Author.create({
  name: "John Piper",
  country: "USA",
  birth_date: new Date("1946-01-11"),
  bio: "John Piper is an American Reformed Baptist pastor and author.",
});

export const MOCK_PUBLISHER: Publisher = Publisher.create({
  name: "Crossway Books",
  country: "USA",
  website: "https://www.crossway.org",
});

export const MOCK_CATEGORY: Category = Category.create({
  name: "Christian Living",
  description: "Books that focus on Christian faith and personal growth.",
});

export const MOCK_BOOK: Book = Book.create({
  title: "Desiring God",
  isbn: "978-1-4335-0595-2",
  published_year: 1986,
  language: Language.ENGLISH,
  edition: "Revised Edition",
  acquired_at: new Date("2023-01-01"),
  total_copies: 10,
  available_copies: 7,
  status: BookStatus.AVAILABLE,
  library_code: "LIB12345",
  page_count: 384,
  description:
    "Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.",
  author: MOCK_AUTHOR,
  publisher: MOCK_PUBLISHER,
  category: MOCK_CATEGORY,
  created_at: new Date(),
});

describe("Postgres Strategy", function () {
  it.only("PostgresSQL Connection", async () => {
    const result = await contextdb.connect();

    expect(result).toEqual(true);
  });

  it("Cadastrar Book", async () => {
    // const expected: Omit<Book, "id"> = {
    //   title: "Desiring God",
    //   author: undefined,
    //   page_count: 384,
    //   publisher: undefined,
    //   deleted_at: undefined,
    //   description:
    //     "Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.",
    //   available: true,
    //   loan_count: 0,
    // };

    const result = await contextdb.create(MOCK_BOOK);
    Reflect.deleteProperty(result, "id");

    // expect(result).toEqual(expected);
  });

  // it("#findAll and Read all books", async () => {
  //   const books = await contextdb.findAll({ skip: 0, take: 2 });
  //   const result = books.length;

  //   const expected = 2;

  //   expect(result).toEqual(expected);
  // });

  // it("#findOne and Read by id of the book", async () => {
  //   const result = await contextdb.findOne({ id: 1 });

  //   const expected: Book = {
  //     id: 1,
  //     title: "Desiring God",
  //     page_count: 384,
  //     author: undefined,
  //     description:
  //       "Desiring God is a paradigm-shattering work that dramatically alters common perspectives on relating to God.",
  //     publisher: undefined,
  //     available: true,
  //     deleted_at: undefined,
  //     loan_count: 0,
  //   };

  //   expect(result).toEqual(expected);
  // });

  // it("#Updated book by book id and findOne by title", async () => {
  //   const updatedBook = new Book(
  //     "updated book",
  //     10,
  //     "updated book description",
  //     true,
  //     0,
  //   );

  //   await contextdb.update(3, updatedBook);

  //   const result = await contextdb.findOne({ title: "updated book" });

  //   const expected: Book = {
  //     id: 3,
  //     title: "updated book",
  //     page_count: 10,
  //     author: undefined,
  //     description: "updated book description",
  //     publisher: undefined,
  //     available: true,
  //     loan_count: 0,
  //     deleted_at: undefined,
  //   };

  //   expect(result).toEqual(expected);
  // });

  // it("#Delete Book by ID", async () => {
  //   const result = await contextdb.delete(2);

  //   const expected = 1;

  //   expect(result.affected).toEqual(expected);
  // });
});
