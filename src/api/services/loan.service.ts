import { AppDataSource } from "../../database/dataSource";
import { Loan, LoanStatus } from "../../entities/library/loans.entity";
import { Repository } from "typeorm";
import { Member } from "../../entities/users/members.entity";
import { BookCopy } from "../../entities/books/book_copies.entity";
import { Reservation } from "../../entities/library/reservations.entity";
import { User } from "../routes/user.routes";

interface IssueLoanInput {
  memberId: string;
  bookCopyId: string;
  issuedById: string;
}

export class LoanService {
  private loanRepository: Repository<Loan>;
  private memberRepository: Repository<Member>;
  private bookCopyRepository: Repository<BookCopy>;
  private reservationRepository: Repository<Reservation>;

  constructor() {
    this.loanRepository = AppDataSource.getRepository(Loan);
    this.memberRepository = AppDataSource.getRepository(Member);
    this.bookCopyRepository = AppDataSource.getRepository(BookCopy);
    this.reservationRepository = AppDataSource.getRepository(Reservation);
  }

  /**
   * 📌 Cria um novo empréstimo para um membro
   */
  async issueLoan({
    bookCopyId,
    issuedById,
    memberId,
  }: IssueLoanInput): Promise<Loan> {
    const member = await this.memberRepository.findOne({
      where: { id: memberId, is_active: true },
    });
    if (!member) throw new Error("Membro não encontrado ou inativo.");

    // Verifica se o livro está disponível
    const bookCopy = await this.bookCopyRepository.findOne({
      where: { id: bookCopyId },
    });
    if (!bookCopy) throw new Error("Livro não encontrado.");

    // Verifica se o livro já está emprestado
    const activeLoan = await this.loanRepository.findOne({
      where: { book_copy: { id: bookCopyId }, status: LoanStatus.ACTIVE },
    });
    if (activeLoan) throw new Error("Este livro já está emprestado.");

    // Verifica se o usuário que emitiu o empréstimo é válido
    const issuedBy = await AppDataSource.getRepository(User).findOne({
      where: { id: issuedById },
    });
    if (!issuedBy) throw new Error("Usuário emissor não encontrado.");

    const newLoan = this.loanRepository.create({
      member,
      book_copy: bookCopy,
      issued_by: issuedBy,
      status: LoanStatus.ACTIVE,
    });

    return this.loanRepository.save(newLoan);
  }

  /**
   * 📌 Lista todos os empréstimos ativos de um membro
   */
  async getActiveLoans(memberId: string): Promise<Loan[]> {
    return this.loanRepository.find({
      where: { member: { id: memberId }, status: LoanStatus.ACTIVE },
      relations: ["member", "book_copy", "issued_by"],
    });
  }

  /**
   * 📌 Processa a devolução de um livro
   */
  async returnLoan(loanId: string): Promise<Loan | null> {
    const loan = await this.loanRepository.findOne({ where: { id: loanId } });
    if (!loan) throw new Error("Empréstimo não encontrado.");

    loan.status = LoanStatus.RETURNED;
    loan.return_deadline = new Date();

    return this.loanRepository.save(loan);
  }

  /**
   * 📌 Renova um empréstimo, desde que não haja reserva ativa para o livro
   */
  async renewLoan(loanId: string): Promise<Loan | null> {
    const loan = await this.loanRepository.findOne({ where: { id: loanId } });
    if (!loan) throw new Error("Empréstimo não encontrado.");

    // Verifica se o empréstimo já foi renovado 2 vezes
    if (loan.is_extended)
      throw new Error("Este empréstimo já foi renovado duas vezes.");

    // Verifica se há reservas ativas para o livro
    const reservationExists = await this.reservationRepository.findOne({
      where: { book: { id: loan.book_copy.book.id } },
    });

    if (reservationExists)
      throw new Error(
        "Este livro possui reservas pendentes e não pode ser renovado.",
      );

    // Atualiza o prazo de devolução
    loan.due_date = new Date(new Date().setDate(new Date().getDate() + 14)); // +14 dias
    loan.is_extended = true;

    return this.loanRepository.save(loan);
  }

  /**
   * 📌 Aplica penalidade ao membro se houver atrasos recorrentes
   */
  async checkPenalties(memberId: string): Promise<void> {
    const lateLoans = await this.loanRepository.find({
      where: { member: { id: memberId }, status: LoanStatus.OVERDUE },
    });

    // Se o membro tiver 3 ou mais atrasos, ele será bloqueado por 30 dias
    if (lateLoans.length >= 3) {
      const member = await this.memberRepository.findOne({
        where: { id: memberId },
      });
      if (member) {
        member.is_active = false;
        await this.memberRepository.save(member);
      }
    }
  }

  /**
   * 📌 Marca livros como "Perdidos" caso passem 30 dias do vencimento
   */
  async markLostBooks(): Promise<void> {
    const overdueLoans = await this.loanRepository.find({
      where: {
        status: LoanStatus.OVERDUE,
        due_date: new Date(new Date().setDate(new Date().getDate() - 30)), // Mais de 30 dias vencido
      },
    });

    for (const loan of overdueLoans) {
      loan.status = LoanStatus.LOST;
      await this.loanRepository.save(loan);
    }
  }
}
