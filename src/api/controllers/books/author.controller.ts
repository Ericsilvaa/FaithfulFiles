import { Request, Response } from "express";
import { AuthorService } from "../../services/author-service";

export class AuthorController {
  private service: AuthorService;

  constructor() {
    this.service = new AuthorService();
  }

  createAuthor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const author = await this.service.createAuthor(req.body);
      return res.status(201).json(author);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "An unknown error occurred" });
    }
  };

  getAuthors = async (_req: Request, res: Response): Promise<Response> => {
    const authors = await this.service.getAuthors();
    return res.json(authors);
  };

  getAuthorById = async (req: Request, res: Response): Promise<Response> => {
    const author = await this.service.getAuthorById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    return res.json(author);
  };

  updateAuthor = async (req: Request, res: Response): Promise<Response> => {
    try {
      const author = await this.service.updateAuthor(req.params.id, req.body);
      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }
      return res.json(author);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "An unknown error occurred" });
    }
  };

  deleteAuthor = async (req: Request, res: Response): Promise<Response> => {
    const success = await this.service.deleteAuthor(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Author not found" });
    }
    return res.status(204).send();
  };
}
