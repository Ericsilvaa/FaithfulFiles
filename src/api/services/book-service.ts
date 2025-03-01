import { Book } from "../../entities/books/books.entity";
import { BookRepository } from "../repositories/book-repository";

export class BookService {
  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    return await this.repository.create(data);
  }

  async getBooks(): Promise<Book[]> {
    return await this.repository.findAll();
  }

  async getBookById(id: string): Promise<Book | null> {
    return await this.repository.findById(id);
  }

  async updateBook(id: string, data: Partial<Book>): Promise<Book | null> {
    return await this.repository.update(id, data);
  }

  async deleteBook(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
