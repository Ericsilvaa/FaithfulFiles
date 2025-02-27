import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoanEntity } from "./loan.entity";

@Entity()
export class LoanHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Loan, (loan) => loan.id)
  loan: LoanEntity;

  @Column()
  returnedDate: Date;
}
