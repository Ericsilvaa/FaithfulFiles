

export interface IBaseStrategy {
  connect(): void
  create(item: any): void
  find(query: any): void
  update(id: any, item: any): void
  delete(id: any): void
}