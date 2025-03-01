import { Repository } from "typeorm";
import { Book } from "../../entities/books/books.entity";
import { AppDataSource } from "../../database/dataSource";

export class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  async create(book: Partial<Book>): Promise<Book> {
    const newBook = this.repository.create(book);
    return await this.repository.save(newBook);
  }

  async findById(id: string): Promise<Book | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ["author", "category", "publisher"],
    });
  }

  async findAll(): Promise<Book[]> {
    return await this.repository.find({
      relations: ["author", "category", "publisher"],
    });
  }

  async update(id: string, data: Partial<Book>): Promise<Book | null> {
    const book = await this.repository.findOneBy({ id });
    if (!book) return null;

    Object.assign(book, data);
    return await this.repository.save(book);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
