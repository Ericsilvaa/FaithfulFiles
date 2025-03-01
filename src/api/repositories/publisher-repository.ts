import { Repository } from "typeorm";
import { Publisher } from "../../entities/books/publishers.entity";
import { AppDataSource } from "../../database/dataSource";

export class PublisherRepository {
  private repository: Repository<Publisher>;

  constructor() {
    this.repository = AppDataSource.getRepository(Publisher);
  }

  async create(publisher: Partial<Publisher>): Promise<Publisher> {
    const newPublisher = this.repository.create(publisher);
    return await this.repository.save(newPublisher);
  }

  async findById(id: string): Promise<Publisher | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Publisher[]> {
    return await this.repository.find();
  }

  async update(
    id: string,
    data: Partial<Publisher>,
  ): Promise<Publisher | null> {
    const publisher = await this.repository.findOneBy({ id });
    if (!publisher) return null;

    Object.assign(publisher, data);
    return await this.repository.save(publisher);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
