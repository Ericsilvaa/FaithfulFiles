import { Repository } from "typeorm";
import {
  LoanHistory,
  LoanHistoryStatus,
} from "../../entities/library/loan_history.entity";
import { AppDataSource } from "../../database/dataSource";
import { recordLoanHistoryDTO } from "../services/loan_history.service";

export class LoanHistoryRepository {
  private repository: Repository<LoanHistory>;

  constructor() {
    this.repository = AppDataSource.getRepository(LoanHistory);
  }

  /**
   * 📌 Registra um empréstimo finalizado no histórico.
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
    const loanHistory = this.repository.create({
      member: { id: memberId },
      book_copy: { id: bookCopyId },
      borrowed_at: borrowedAt,
      due_date: dueDate,
      returned_at: returnedAt,
      status,
      notes,
    });

    return this.repository.save(loanHistory);
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um membro.
   */
  async getMemberLoanHistory(memberId: string): Promise<LoanHistory[]> {
    return this.repository.find({
      where: { member: { id: memberId } },
      relations: ["member", "book_copy"],
      order: { returned_at: "DESC" },
    });
  }

  /**
   * 📌 Obtém o histórico de empréstimos de um livro específico.
   */
  async getBookLoanHistory(bookCopyId: string): Promise<LoanHistory[]> {
    return this.repository.find({
      where: { book_copy: { id: bookCopyId } },
      relations: ["member", "book_copy"],
      order: { returned_at: "DESC" },
    });
  }

  /**
   * 📌 Marca um empréstimo como perdido ou danificado.
   */
  async markLoanAsLostOrDamaged(
    loanHistoryId: string,
    status: LoanHistoryStatus,
    notes?: string,
  ): Promise<LoanHistory | null> {
    const loanHistory = await this.repository.findOne({
      where: { id: loanHistoryId },
    });
    if (!loanHistory) return null;

    if (![LoanHistoryStatus.LOST, LoanHistoryStatus.DAMAGED].includes(status)) {
      throw new Error("Status inválido para marcação de perda ou dano.");
    }

    loanHistory.status = status;
    if (notes) {
      loanHistory.notes = notes;
    }

    return this.repository.save(loanHistory);
  }
}
