import { Request, Response } from "express";
import { Member } from "../../entities/users/members.entity";
import { MemberService } from "../services/membe.service";

export class MemberController {
  private memberService: MemberService;

  constructor() {
    this.memberService = new MemberService();
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, churchId } = req.body;

      if (!userId || !churchId) {
        return res
          .status(400)
          .json({ message: "userId and churchId are required" });
      }

      const member: Member = await this.memberService.registerMember(
        userId,
        churchId,
      );
      return res.status(201).json(member);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
