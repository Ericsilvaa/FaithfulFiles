

export interface IBaseStrategy {
  connect(): void
  create<T>(item: T): Promise<T>
  find(query: any): void
  update(id: any, item: any): void
  delete(id: any): void
}