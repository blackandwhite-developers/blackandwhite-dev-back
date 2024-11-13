import HttpException from "@/api/common/exceptions/http.exception";
import { ReservationResponseDTO } from "../dto/reservationResponse.dto";
import { ReservationRepository } from "../repository/reservation.repository";
import { ReservationService } from "./reservation.service.type";

export default class ReservationServiceImpl implements ReservationService{
    private readonly _reservationRepository: ReservationRepository;

    constructor(_reservationRepository: ReservationRepository){
        this._reservationRepository = _reservationRepository;
    }

    async getReservation(): Promise<ReservationResponseDTO[]> {
        const reservations = await this._reservationRepository.findAll();

        const newList = await Promise.all(
            reservations.map((Reservations) => new ReservationResponseDTO(Reservations))
        );

        return newList;
    }

    async getReservationDetail(reservationId: string): Promise<ReservationResponseDTO | null> {
        const reservations = await this._reservationRepository.findById(reservationId);

        if (!reservations) {
            throw new HttpException(404, "예약을 찾을 수 없습니다.");
        }

        return new ReservationResponseDTO(reservations);
    }

    async createReservation(
        params: Omit<IReservation, "id">
    ): Promise<ReservationResponseDTO> {
        const newReservations = await this._reservationRepository.save({
            ...params,
        });
    
        return new ReservationResponseDTO(newReservations);
    }

    async updateReservation(reservationId: string, updateReservations: Omit <IReservation, "id" | "reserverName"| "information">): Promise<void> {
        await this._reservationRepository.update(reservationId, updateReservations);

        return;
    }
    async deleteReservation(reservationId: string): Promise<void> {
        await this._reservationRepository.delete(reservationId);

        return;
    }

    async patchCancelReservation(id: string): Promise<void> {
        const findReservation = await this._reservationRepository.findById(id);
        if (!findReservation) throw new HttpException(404, "예약내역을 찾을 수 없습니다.");
        await this._reservationRepository.update(id, { status: 'cancel' });
    
        return;
    }


}