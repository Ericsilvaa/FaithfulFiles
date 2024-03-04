import { Repository } from "typeorm";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Author } from "../entities/postgres/author.entity";
import { Book } from "../entities/postgres/book.entity";
import { Request, Response } from "express";


export default class AuthorController {
  constructor(private context: ContextStrategy, private repositoryRole?: Repository<Book>) { }

  async getAuthorById(req: Request, res: Response) {
    const { author_id } = req.params

    try {
      const Author = await this.context.findOne({ id: Number(author_id) })

      if (Author) {
        return res.status(200).json(Author);
      }

      return res.status(401).send('Livro não encontrado!')

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'drop on catch' });
    }
  }

  async getAllAuthors(req: Request, res: Response) {
    try {
      const Authors = await this.context.findAll({})
      return res.status(200).json(Authors);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }


  async createOrUpdateAuthor(req: Request, res: Response) {
    const { author_id: id } = req.params
    const updateAuthor = <Author>req.body;

    try {
      if (!id) {
        const newAuthor = new Author(updateAuthor.name);
        this.context.save(newAuthor)
        return res.status(201).json({ message: 'Autor criado com sucesso' });
      }

      const isAuthor = await this.context.findOne({ id })

      const newAuthor = {
        ...isAuthor,
        ...updateAuthor
      }
      const { affected } = await this.context.update(Number(id), newAuthor)

      return res.status(200).json({ message: 'Author Atualizado', success: affected === 1 ? true : false });

    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }

  // async getAuthorByFilters(req: Request, res: Response) {
  //   const { campo, valor } = req.query

  //   try {
  //     const listAuthors = await this.context.findAllByGenerics(campo as keyof Book, valor as string)

  //     return res.status(200).json(listAuthors)
  //   } catch (error) {
  //     return res.status(400).json({ message: 'error meu fi' })
  //   }

  // }

}