

export interface IBaseStrategy {
  connect(): void
  create(item: any): void
  find(item: any): void
}