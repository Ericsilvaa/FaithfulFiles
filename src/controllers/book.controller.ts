import { Request, Response } from "express";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Book } from "../entities/postgres/book.entity";

export default class BookController {
  constructor(private context: ContextStrategy) { }

  async getBookById(req: Request, res: Response) {
    const { book_id } = req.params

    try {
      const book = await this.context.findOne({ id: Number(book_id) })

      if (book) {
        return res.status(200).json(book);
      }

      return res.status(401).send('Livro não encontrado!')

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'drop on catch' });
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await this.context.findAll({})
      return res.status(200).json(books);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }


  async createBook(req: Request, res: Response) {
    const { book_id } = req.params
    const { title, page_count, description, available, loan_count } = <Book>req.body;

    try {
      if (!book_id) {
        const newBook = new Book(title, page_count, description, available, loan_count);

        this.context.save(newBook)

        return res.status(201).json({ message: 'Livro criado com sucesso' });
      }

      const updateBook = new Book(title, page_count, description, available, loan_count);

      const { affected } = await this.context.update(Number(book_id), updateBook)

      return res.status(200).json({ message: 'Livro Atualizado', success: affected === 1 ? true : false });


    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }

  async updatedBook(req: Request, res: Response) {

  }


}