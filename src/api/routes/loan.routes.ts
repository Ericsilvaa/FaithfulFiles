import { Router, Request, Response } from "express";
import { LoanController } from "../controllers/books/loan.controller";

const router = Router();
const loanController = new LoanController();

// 📌 Criar um novo empréstimo
router.post(
  "/loans",
  async (req: Request, res: Response) =>
    await loanController.createLoan(req, res),
);

// 📌 Listar empréstimos ativos de um membro
router.get(
  "/loans/:memberId",
  async (req: Request, res: Response) =>
    await loanController.getLoans(req, res),
);

// 📌 Registrar devolução de um livro
router.put(
  "/loans/return/:loanId",
  async (req: Request, res: Response) =>
    await loanController.returnBook(req, res),
);

// 📌 Solicitar renovação de empréstimo
router.post(
  "/loans/renew/:loanId",
  async (req: Request, res: Response) =>
    await loanController.renewLoan(req, res),
);

export default router;
