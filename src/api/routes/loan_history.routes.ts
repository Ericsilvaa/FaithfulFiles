import { Router, Request, Response } from "express";
import { LoanHistoryController } from "../controllers/loan_history.controller";

const router = Router();
const loanHistoryController = new LoanHistoryController();

// 📌 Registra um empréstimo finalizado no histórico
router.post(
  "/loan_history",
  async (req: Request, res: Response) =>
    await loanHistoryController.recordLoan(req, res),
);

// 📌 Obtém o histórico de empréstimos de um membro
router.get(
  "/loan_history/member/:memberId",
  async (req: Request, res: Response) =>
    await loanHistoryController.getMemberLoanHistory(req, res),
);

// 📌 Obtém o histórico de empréstimos de um livro
router.get(
  "/loan_history/book/:bookCopyId",
  async (req: Request, res: Response) =>
    await loanHistoryController.getBookLoanHistory(req, res),
);

// 📌 Marca um empréstimo como perdido ou danificado
router.put(
  "/loan_history/mark",
  async (req: Request, res: Response) =>
    await loanHistoryController.markLoanAsLostOrDamaged(req, res),
);

export default router;
