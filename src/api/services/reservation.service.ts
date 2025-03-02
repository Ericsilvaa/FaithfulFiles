import { AppDataSource } from "../../database/dataSource";
import { Repository } from "typeorm";
import {
  Reservation,
  ReservationStatus,
} from "../../entities/library/reservations.entity";
import { Member } from "../../entities/users/members.entity";
import { Book } from "../../entities/books/books.entity";

export class ReservationService {
  private reservationRepository: Repository<Reservation>;
  private memberRepository: Repository<Member>;
  private bookRepository: Repository<Book>;

  constructor() {
    this.reservationRepository = AppDataSource.getRepository(Reservation);
    this.memberRepository = AppDataSource.getRepository(Member);
    this.bookRepository = AppDataSource.getRepository(Book);
  }

  /**
   * 📌 Cria uma nova reserva de livro para um membro.
   */
  async createReservation(
    memberId: string,
    bookId: string,
  ): Promise<Reservation> {
    // Verifica se o membro existe e está ativo
    const member = await this.memberRepository.findOne({
      where: { id: memberId, is_active: true },
    });
    if (!member) {
      throw new Error("Membro não encontrado ou inativo.");
    }

    // Verifica se o livro existe
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error("Livro não encontrado.");
    }

    // Verifica se o membro já tem uma reserva ativa para esse livro
    const existingReservation = await this.reservationRepository.findOne({
      where: {
        member: { id: memberId },
        book: { id: bookId },
        status: ReservationStatus.PENDING,
      },
    });

    if (existingReservation) {
      throw new Error("O membro já possui uma reserva ativa para este livro.");
    }

    // Cria a reserva
    const newReservation = this.reservationRepository.create({
      member,
      book,
      status: ReservationStatus.PENDING,
    });

    return this.reservationRepository.save(newReservation);
  }

  /**
   * 📌 Lista todas as reservas ativas de um membro.
   */
  async getActiveReservations(memberId: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { member: { id: memberId }, status: ReservationStatus.PENDING },
      relations: ["member", "book"],
    });
  }

  /**
   * 📌 Cancela uma reserva ativa.
   */
  async cancelReservation(reservationId: string): Promise<Reservation | null> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new Error("Reserva não encontrada.");
    }

    reservation.status = ReservationStatus.CANCELLED;
    return this.reservationRepository.save(reservation);
  }

  /**
   * 📌 Expira automaticamente reservas após 7 dias.
   */
  async expireReservations(): Promise<void> {
    const expiredReservations = await this.reservationRepository.find({
      where: {
        status: ReservationStatus.PENDING,
        expiration_date: new Date(new Date().setDate(new Date().getDate() - 7)), // Reservas com mais de 7 dias
      },
    });

    for (const reservation of expiredReservations) {
      reservation.status = ReservationStatus.EXPIRED;
      await this.reservationRepository.save(reservation);
    }
  }
}
