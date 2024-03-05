import { Book } from "../../../entities/postgres/book.entity"


export interface IBaseStrategy {
  connect(): void
  disconnect(): void
  create<T>(item: T): T
  save<T>(item: T): Promise<T>
  findOne({ query }: any, relations?: string[]): void
  findAll({ skip, take, relations }: { skip: number, take: number, relations: string[] }): void
  findAndCount({ relations }: { relations: string[] }): void
  findAllByGenerics<T extends keyof Book>(field: T, value: Book[T], relations?: string[]): Promise<T>
  update(id: any, item: any): void
  delete(id: any): void
}