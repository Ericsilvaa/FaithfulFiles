import { Request, Response } from "express";
import { ReservationService } from "../../services/reservation.service";

export class ReservationController {
  private reservationService: ReservationService;

  constructor() {
    this.reservationService = new ReservationService();
  }

  async createReservation(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId, bookId } = req.body;
      if (!memberId || !bookId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const reservation = await this.reservationService.createReservation(
        memberId,
        bookId,
      );
      return res.status(201).json(reservation);
    } catch (error) {
      return res.status(500).json({
        message: "Error creating reservation",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async getReservations(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      if (!memberId) {
        return res.status(400).json({ message: "Member ID is required" });
      }

      const reservations = await this.reservationService.getActiveReservations(
        memberId,
      );
      return res.status(200).json(reservations);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching reservations",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
