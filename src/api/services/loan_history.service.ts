import {
  LoanHistory,
  LoanHistoryStatus,
} from "../../entities/library/loan_history.entity";
import { LoanHistoryRepository } from "../repositories/loan_history.repository";

export interface recordLoanHistoryDTO {
  memberId: string;
  bookCopyId: string;
  borrowedAt: Date;
  dueDate: Date;
  status: LoanHistoryStatus;
  returnedAt: Date;
  notes?: string;
}

export class LoanHistoryService {
  private loanHistoryRepository: LoanHistoryRepository;

  constructor() {
    this.loanHistoryRepository = new LoanHistoryRepository();
  }

  /**
   * 📌 Registra um empréstimo no histórico quando um livro for devolvido.
   */
  async recordLoanHistory({
    memberId,
    bookCopyId,
    borrowedAt,
    dueDate,
    status,
    returnedAt,
    notes,
  }: recordLoanHistoryDTO): Promise<LoanHistory> {
    return this.loanHistoryRepository.recordLoanHistory({
      memberId,
      bookCopyId,
      borrowedAt,
      dueDate,
      status,
      returnedAt,
      notes,
    });
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um membro específico.
   */
  async getMemberLoanHistory(memberId: string): Promise<LoanHistory[]> {
    return this.loanHistoryRepository.getMemberLoanHistory(memberId);
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um livro específico.
   */
  async getBookLoanHistory(bookCopyId: string): Promise<LoanHistory[]> {
    return this.loanHistoryRepository.getBookLoanHistory(bookCopyId);
  }

  /**
   * 📌 Marca um empréstimo como perdido ou danificado.
   */
  async markLoanAsLostOrDamaged(
    loanHistoryId: string,
    status: LoanHistoryStatus,
    notes?: string,
  ): Promise<LoanHistory | null> {
    return this.loanHistoryRepository.markLoanAsLostOrDamaged(
      loanHistoryId,
      status,
      notes,
    );
  }
}
