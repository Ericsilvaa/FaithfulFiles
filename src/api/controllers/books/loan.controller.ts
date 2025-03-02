import { Request, Response } from "express";
import { LoanService } from "../../services/loan.service";

export class LoanController {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  async createLoan(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId, bookCopyId, issuedById } = req.body;
      if (!memberId || !bookCopyId || !issuedById) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const loan = await this.loanService.issueLoan({
        memberId,
        bookCopyId,
        issuedById,
      });
      return res.status(201).json(loan);
    } catch (error) {
      return res.status(500).json({
        message: "Error creating loan",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async getLoans(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res.status(400).json({ message: "Member ID is required" });
      }

      const loans = await this.loanService.getActiveLoans(memberId);
      return res.status(200).json(loans);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching loans",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async returnBook(req: Request, res: Response): Promise<Response> {
    try {
      const { loanId } = req.params;
      if (!loanId) {
        return res.status(400).json({ message: "Loan ID is required" });
      }

      const updatedLoan = await this.loanService.returnLoan(loanId);
      if (!updatedLoan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      return res.status(200).json(updatedLoan);
    } catch (error) {
      return res.status(500).json({
        message: "Error returning book",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async renewLoan(req: Request, res: Response): Promise<Response> {
    try {
      const { loanId } = req.params;
      if (!loanId) {
        return res.status(400).json({ message: "Loan ID is required" });
      }

      const renewedLoan = await this.loanService.renewLoan(loanId);
      if (!renewedLoan) {
        return res
          .status(404)
          .json({ message: "Loan not found or cannot be renewed" });
      }

      return res.status(200).json(renewedLoan);
    } catch (error) {
      return res.status(500).json({
        message: "Error renewing loan",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
