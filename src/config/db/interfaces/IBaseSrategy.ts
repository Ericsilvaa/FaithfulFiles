

export interface IBaseStrategy {
  // connect(): void
  create<T>(item: T): T
  save<T>(item: T): Promise<T>
  findAll({ skip, take, relations }: { skip: number, take: number, relations: string[] }): void
  findAndCount({ relations }: { relations: string[] }): void
  findOne({ query }: any): void
  update(id: any, item: any): void
  delete(id: any): void
}