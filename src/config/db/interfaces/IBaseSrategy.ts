

export interface IBaseStrategy {
  // connect(): void
  create<T>(item: T): Promise<T>
  findAll({ skip, take }: { skip: number, take: number }): void
  findOne({ query }: any, { relations }: { relations?: string[] }): void
  update(id: any, item: any): void
  delete(id: any): void
}