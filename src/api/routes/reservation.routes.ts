import { Router, Request, Response } from "express";
import { ReservationController } from "../controllers/books/reservation.controller";

const router = Router();
const reservationController = new ReservationController();

// 📌 Criar uma nova reserva
router.post(
  "/reservations",
  async (req: Request, res: Response) =>
    await reservationController.createReservation(req, res),
);

// 📌 Listar reservas ativas de um membro
router.get(
  "/reservations/:memberId",
  async (req: Request, res: Response) =>
    await reservationController.getReservations(req, res),
);

export default router;
