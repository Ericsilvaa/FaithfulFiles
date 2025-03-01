import { Publisher } from "../../entities/books/publishers.entity";
import { PublisherRepository } from "../repositories/publisher-repository";

export class PublisherService {
  private repository: PublisherRepository;

  constructor() {
    this.repository = new PublisherRepository();
  }

  async createPublisher(data: Partial<Publisher>): Promise<Publisher> {
    return await this.repository.create(data);
  }

  async getPublishers(): Promise<Publisher[]> {
    return await this.repository.findAll();
  }

  async getPublisherById(id: string): Promise<Publisher | null> {
    return await this.repository.findById(id);
  }

  async updatePublisher(
    id: string,
    data: Partial<Publisher>,
  ): Promise<Publisher | null> {
    return await this.repository.update(id, data);
  }

  async deletePublisher(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
