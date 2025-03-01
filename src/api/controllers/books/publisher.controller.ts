import { Request, Response } from "express";
import { PublisherService } from "../../services/publisher-service";

export class PublisherController {
  private service: PublisherService;

  constructor() {
    this.service = new PublisherService();
  }

  createPublisher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const publisher = await this.service.createPublisher(req.body);
      return res.status(201).json(publisher);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  };

  getPublishers = async (_req: Request, res: Response): Promise<Response> => {
    const publishers = await this.service.getPublishers();
    return res.json(publishers);
  };

  getPublisherById = async (req: Request, res: Response): Promise<Response> => {
    const publisher = await this.service.getPublisherById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ error: "Publisher not found" });
    }
    return res.json(publisher);
  };

  updatePublisher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const publisher = await this.service.updatePublisher(
        req.params.id,
        req.body,
      );
      if (!publisher) {
        return res.status(404).json({ error: "Publisher not found" });
      }
      return res.json(publisher);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  };

  deletePublisher = async (req: Request, res: Response): Promise<Response> => {
    const success = await this.service.deletePublisher(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Publisher not found" });
    }
    return res.status(204).send();
  };
}
