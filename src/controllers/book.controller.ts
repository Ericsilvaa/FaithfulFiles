import { Request, Response } from "express";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Book } from "../entities/postgres/book.entity";

export default class BookController {
  constructor(
    private context: ContextStrategy,
    private repositoryAuthor: any,
    private repositoryPublisher: any
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

  async createOrUpdateBook(req: Request, res: Response) {
    const [_, pathname] = req.path.split("/");

    const { book_id: id } = req.params;
    const book = <Book>req.body;

    try {
      if (pathname === "add") {
        const isBookExist = await this.context.findOne({ title: book.title });

        if (isBookExist)
          return res.status(404).json({ message: "O livro já existe" });

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

        this.context.save(newBook);
        return res.status(201).json({ message: "Livro criado com sucesso" });
      }

       
    } catch (error) {
      return res.status(500).json({ error, message: "drop on catch" });
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

  async updateAuthorBook(req: Request, res: Response) {
    // update livro pelo id
    // const isBookExist = await this.context.findOne({
    //   where: { id },
    // });
    // const newBookUpdate = {
    //   ...isBookExist,
    //   ...book
    // }
    // console.log("🚀 ~ BookController ~ updateAuthorBook ~ newBookUpdate:", newBookUpdate)
    // const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    // adotante.endereco = novoEndereco;
    // await this.repository.save(adotante);
    // const { success, message } = await this.repository.atualizaEnderecoAdotante(
    //   Number(id),
    //   req.body as EnderecoEntity
    // );
    // if (!success) {
    //   return res.status(404).json({ message });
    // }
    // return res.sendStatus(204);
  }
}
