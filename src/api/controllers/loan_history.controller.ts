import { Request, Response } from "express";
import { LoanHistoryService } from "../services/loan_history.service";
import { LoanHistoryStatus } from "../../entities/library/loan_history.entity";

export class LoanHistoryController {
  private loanHistoryService: LoanHistoryService;

  constructor() {
    this.loanHistoryService = new LoanHistoryService();
  }

  /**
   * 📌 Registra um empréstimo finalizado no histórico.
   */
  async recordLoan(req: Request, res: Response): Promise<Response> {
    try {
      const {
        memberId,
        bookCopyId,
        borrowedAt,
        dueDate,
        returnedAt,
        status,
        notes,
      } = req.body;

      if (!memberId || !bookCopyId || !borrowedAt || !dueDate || !status) {
        return res
          .status(400)
          .json({ message: "Campos obrigatórios ausentes." });
      }

      const loanHistory = await this.loanHistoryService.recordLoanHistory({
        memberId,
        bookCopyId,
        borrowedAt: new Date(borrowedAt),
        dueDate: new Date(dueDate),
        returnedAt: new Date(returnedAt),
        status,
        notes,
      });

      return res.status(201).json(loanHistory);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao registrar o histórico de empréstimo.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um membro.
   */
  async getMemberLoanHistory(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;

      if (!memberId) {
        return res
          .status(400)
          .json({ message: "O ID do membro é obrigatório." });
      }

      const history = await this.loanHistoryService.getMemberLoanHistory(
        memberId,
      );
      return res.status(200).json(history);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar histórico do membro.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um livro.
   */
  async getBookLoanHistory(req: Request, res: Response): Promise<Response> {
    try {
      const { bookCopyId } = req.params;

      if (!bookCopyId) {
        return res
          .status(400)
          .json({ message: "O ID da cópia do livro é obrigatório." });
      }

      const history = await this.loanHistoryService.getBookLoanHistory(
        bookCopyId,
      );
      return res.status(200).json(history);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar histórico do livro.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  /**
   * 📌 Marca um empréstimo como perdido ou danificado.
   */
  async markLoanAsLostOrDamaged(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { loanHistoryId, status, notes } = req.body;

      if (!loanHistoryId || !status) {
        return res.status(400).json({
          message:
            "O ID do histórico de empréstimo e o status são obrigatórios.",
        });
      }

      if (
        ![LoanHistoryStatus.LOST, LoanHistoryStatus.DAMAGED].includes(status)
      ) {
        return res.status(400).json({
          message:
            "Status inválido. Apenas 'lost' ou 'damaged' são permitidos.",
        });
      }

      const updatedHistory =
        await this.loanHistoryService.markLoanAsLostOrDamaged(
          loanHistoryId,
          status,
          notes,
        );
      if (!updatedHistory) {
        return res
          .status(404)
          .json({ message: "Histórico de empréstimo não encontrado." });
      }

      return res.status(200).json(updatedHistory);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar o status do histórico.",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
