import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Author } from "../../entities/books/authors.entity";

export class AuthorRepository {
  private repository: Repository<Author>;

  constructor() {
    this.repository = AppDataSource.getRepository(Author);
  }

  async create(author: Partial<Author>): Promise<Author> {
    const newAuthor = this.repository.create(author);
    return await this.repository.save(newAuthor);
  }

  async findById(id: string): Promise<Author | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Author[]> {
    return await this.repository.find();
  }

  async update(id: string, author: Partial<Author>): Promise<Author | null> {
    const result = await this.repository.update(id, author);
    return result.affected === 1 ? this.repository.findOneBy({ id }) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
