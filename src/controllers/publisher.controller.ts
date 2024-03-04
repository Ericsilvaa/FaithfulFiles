import { Request, Response } from "express";
import ContextStrategy from "../config/strategies/base/context.strategy";
import { Publisher } from "../entities/postgres/publisher.entity";
import { Repository } from "typeorm";
import { Book } from "../entities/postgres/book.entity";


export default class PublisherController {
  constructor(private context: ContextStrategy, private repositoryBook?: Repository<Book>) {

  }


  async getPublisherById(req: Request, res: Response) {
    const { publisher_id } = req.params

    try {
      const Publisher = await this.context.findOne({ id: Number(publisher_id) })

      if (Publisher) {
        return res.status(200).json(Publisher);
      }

      return res.status(401).send('Livro não encontrado!')

    } catch (error) {
      return res
        .status(500)
        .json({ message: 'drop on catch' });
    }
  }

  async getAllPublishers(req: Request, res: Response) {
    try {
      const Publishers = await this.context.findAll({})
      return res.status(200).json(Publishers);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }


  async createOrUpdatePublisher(req: Request, res: Response) {
    const [_, pathname] = req.path.split("/");
    const { publisher_id: id } = req.params
    const publisher = <Publisher>req.body;

    try {
      if (pathname === 'add') {
        const isPublisherExist = await this.context.findOne({ name: publisher.name });

        if (isPublisherExist)
          return res.status(404).json({ message: "A Editora já existe" });
        const newPublisher = Publisher.createPublisher(publisher)

        this.context.save(newPublisher)
        return res.status(201).json({ message: 'Autor criado com sucesso' });
      }

      const isPublisher = await this.context.findOne({ id })

      if (!isPublisher) {
        console.log("🚀 ~ PublisherController ~ createOrUpdatePublisher ~ isBookExist:", isPublisher)
        return;
      }

      const { affected } = await this.context.update(Number(id), publisher)

      return res.status(200).json({ message: 'Publisher Atualizado', success: affected === 1 ? true : false });

    } catch (error) {
      return res
        .status(500)
        .json({ error, message: 'drop on catch' });
    }
  }

  // async getPublisherByFilters(req: Request, res: Response) {
  //   const { campo, valor } = req.query

  //   try {
  //     const listPublishers = await this.context.findAllByGenerics(campo as keyof Book, valor as string)

  //     return res.status(200).json(listPublishers)
  //   } catch (error) {
  //     return res.status(400).json({ message: 'error meu fi' })
  //   }

  // }




}