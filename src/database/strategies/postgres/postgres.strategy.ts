import {
  DataSource,
  EntityTarget,
  ILike,
  Like,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from "typeorm";
import { Book } from "../../../entities/books/books.entity";
import { AppDataSource } from "../../dataSource";

export default class PostgresStrategy {
  private repository: Repository<ObjectLiteral>;

  constructor(repository: Repository<ObjectLiteral>) {
    this.repository = repository;
  }

  static async connect() {
    try {
      const connection = await AppDataSource.initialize();

      if (!connection.isInitialized)
        throw new Error("Error initial database. connection");
      console.log("✅ Database connected!");
      console.log(
        "📦 Entities loaded:",
        AppDataSource.entityMetadatas.map((e) => e.name),
      );
      return connection;
    } catch (error) {
      console.log(error);
    }
  }

  static createRepository<T extends ObjectLiteral>(
    connection: DataSource,
    entity: string,
  ): Repository<T> {
    const repository = connection.getRepository<T>(entity as EntityTarget<T>);
    return repository;
  }

  async create(item: any) {
    this.repository.create(item);
  }

  async save<T>(item: T): Promise<T>;
  async save(item: Book): Promise<Book> {
    return this.repository.save(item);
  }

  async findAll(query: any) {
    return await this.repository.find(query);
  }

  async findOne(query: any, relations?: string[]) {
    return await this.repository.findOne({ where: query, relations });
  }

  async findAndCount(query: any) {
    return await this.repository.findAndCount(query);
  }

  async findAllByGenerics<T extends keyof Book>(
    field: T,
    value: Book[T],
    relations?: string[],
  ): Promise<ObjectLiteral[]> {
    const normalizeValue =
      field === "status"
        ? { [field]: Boolean(value) }
        : { [field]: ILike(`%${value}%`) };

    const result = await this.repository.find({
      where: normalizeValue,
      relations,
    });
    return result;
  }

  async update(id: number, item: any): Promise<UpdateResult> {
    return await this.repository.update(id, item);
  }

  async delete(id: number) {
    return await this.repository.softDelete(id);
  }
}
