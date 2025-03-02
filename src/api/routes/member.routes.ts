import { Router, Request, Response } from "express";
import { MemberController } from "../repositories/member.repository";

const router = Router();
const memberController = new MemberController();

router.post(
  "/members",
  async (req: Request, res: Response) =>
    await memberController.register(req, res),
);

export default router;
