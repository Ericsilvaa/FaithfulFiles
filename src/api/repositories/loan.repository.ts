import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { Loan, LoanStatus } from "../../entities/library/loans.entity";

export class LoanRepository {
  private repository: Repository<Loan>;

  constructor() {
    this.repository = AppDataSource.getRepository(Loan);
  }

  async createLoan(data: Partial<Loan>): Promise<Loan> {
    const loan = this.repository.create(data);
    return this.repository.save(loan);
  }

  async findActiveLoansByMember(memberId: string): Promise<Loan[]> {
    return this.repository.find({
      where: { member: { id: memberId }, status: LoanStatus.ACTIVE },
      relations: ["member", "book_copy", "issued_by"],
    });
  }

  async markAsReturned(loanId: string): Promise<Loan | null> {
    const loan = await this.repository.findOne({ where: { id: loanId } });

    if (!loan) return null;

    loan.status = LoanStatus.RETURNED;
    loan.return_deadline = new Date();

    return this.repository.save(loan);
  }
}
