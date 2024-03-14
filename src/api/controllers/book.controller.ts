import { Request, Response } from "express";
import ContextStrategy from "../../database/strategies/base/context.strategy";
import { Book } from "../../database/entities/postgres/book.entity";
import { UserEntity } from "../../database/entities/postgres/user.entity";

export default class BookController {
  constructor(
    private context: ContextStrategy,
    private repositoryAuthor: any,
    private repositoryPublisher: any,
    private repositoryUser: any
  ) { }

  async getBookById(req: Request, res: Response) {
    const { book_id } = req.params;

    try {
      const book = await this.context.findOne({ id: Number(book_id) });

      if (book) {
        return res.status(200).json(book);
      }

      return res.status(401).send("Livro não encontrado!");
    } catch (error) {
      return res.status(500).json({ message: "drop on catch" });
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await this.context.findAll({ relations: ['author', 'publisher'] });
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch" });
    }
  }

  async createBook(req: Request, res: Response) {
    const book = <Book>req.body;
    const { email } = req.userLogged

    const user = await this.repositoryUser.findOne({ where: { email }, relations: ['owner_book'] }) as UserEntity

    try {
      const isBookExist = await this.context.findOne({ title: book.title }, ['owner']);

      if (isBookExist && isBookExist.owner.email === user.email) {
        return res.status(404).json({ message: "O livro já existe e você já tem ele!" });
      }

      if (book.author) {
        const existAuthor = await this.repositoryAuthor.findOne({
          where: { name: book.author },
        });
        if (!existAuthor)
          return res.status(404).json({ message: "Autor não encontrado" });
        book.author = existAuthor;
      }

      if (book.publisher) {
        console.log('Book Publish', book.publisher)
        const existPublisher = await this.repositoryPublisher.findOne({
          where: { name: book.publisher },
        });

        if (!existPublisher)
          return res.status(404).json({ message: "Editora não encontrada" });
        book.publisher = existPublisher;
      }

      const newBook = Book.createBook(book);
      newBook.owner = user

      this.context.save(newBook);
      return res.status(201).json({ message: "Livro criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch" });
    }
  }

  async updateBook(req: Request, res: Response) {
    const book = <Book>req.body;
    const { book_id: id } = req.params;
    const { email } = req.userLogged

    try {
      const user = await this.repositoryUser.findOne({ where: { email }, relations: ['owner_book'] }) as UserEntity
      const isBookExist = await this.context.findOne({ id }, ['owner']) as Book

      if (isBookExist && isBookExist.owner?.email === user.email) {
        if (book.author) {
          const existAuthor = await this.repositoryAuthor.findOne({
            where: { name: book.author },
          });
          if (!existAuthor)
            return res.status(404).json({ message: "Autor não encontrado" });
          book.author = existAuthor;
        }

        if (book.publisher) {
          console.log('Book Publish', book.publisher)
          const existPublisher = await this.repositoryPublisher.findOne({
            where: { name: book.publisher },
          });
          if (!existPublisher)
            return res.status(404).json({ message: "Editora não encontrada" });
          book.publisher = existPublisher;
        }

        const bookupdate = {
          ...isBookExist,
          ...book
        }

        const newBook = Book.createBook(bookupdate);

        this.context.update(isBookExist.id, newBook);
        return res.status(201).json({ message: "Livro atualizado com sucesso" });
      }

      return res.status(401).send('Usuario não autorizado a atualizar livro!')

    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch - bookcontroller" });
    }
  }


  async getBookByFilters(req: Request, res: Response) {
    const { campo, valor } = req.query;

    try {
      const relations = ['author', 'publisher']
      const listBooks = await this.context.findAllByGenerics(campo as keyof Book, valor as string, relations);

      return res.status(200).json(listBooks);
    } catch (error) {
      return res.status(400).json({ message: "error meu fi" });
    }
  }

  async deleteBook(req: Request, res: Response) {
    const { book_id } = req.params;
    const { email } = req.userLogged

    try {
      const book = await this.context.findOne({ id: Number(book_id) }, ['owner']);

      if (!book) return res.status(400).send("Livro não encontrado");

      if (book && book.owner?.email === email) {
        const { affected } = await this.context.delete(book.id)

        return res.status(200).send("Livro Excluído com sucesso");
      } else {
        return res.status(400).send("Úsuario poderá excluir somente seus próprios livros");
      }

    } catch (error) {
      return res.status(500).end('Server error')
    }
  }
}
