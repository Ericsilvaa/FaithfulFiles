

export interface IBaseStrategy {
  connect(): void
  create<T>(item: T): Promise<T>
  findAll({ skip, take }: { skip: number, take: number }): void
  findOne({ query }: { query: any }): void
  update(id: any, item: any): void
  delete(id: any): void
}