import { Author } from "../../entities/books/authors.entity";
import { AuthorRepository } from "../repositories/author-repository";

export class AuthorService {
  private repository: AuthorRepository;

  constructor() {
    this.repository = new AuthorRepository();
  }

  async createAuthor(data: Partial<Author>): Promise<Author> {
    return await this.repository.create(data);
  }

  async getAuthors(): Promise<Author[]> {
    return await this.repository.findAll();
  }

  async getAuthorById(id: string): Promise<Author | null> {
    return await this.repository.findById(id);
  }

  async updateAuthor(
    id: string,
    data: Partial<Author>,
  ): Promise<Author | null> {
    return await this.repository.update(id, data);
  }

  async deleteAuthor(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
