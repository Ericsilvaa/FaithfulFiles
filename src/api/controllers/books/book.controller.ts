import { Request, Response } from "express";
import { BookService } from "../../services/book-service";

export class BookController {
  private service: BookService;

  constructor() {
    this.service = new BookService();
  }

  createBook = async (req: Request, res: Response): Promise<Response> => {
    try {
      const book = await this.service.createBook(req.body);
      return res.status(201).json(book);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  };

  getBooks = async (_req: Request, res: Response): Promise<Response> => {
    const books = await this.service.getBooks();
    return res.json(books);
  };

  getBookById = async (req: Request, res: Response): Promise<Response> => {
    const book = await this.service.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.json(book);
  };

  updateBook = async (req: Request, res: Response): Promise<Response> => {
    try {
      const book = await this.service.updateBook(req.params.id, req.body);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      return res.json(book);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  };

  deleteBook = async (req: Request, res: Response): Promise<Response> => {
    const success = await this.service.deleteBook(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(204).send();
  };
}
