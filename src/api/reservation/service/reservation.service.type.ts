import { ReservationResponseDTO } from '../dto/reservationResponse.dto';

export interface ReservationService {
  /** 예약 목록 조회 */
  getReservation(): Promise<ReservationResponseDTO[]>;
  /** 예약 목록 조회 */
  getReservationByUserId(userId: string): Promise<ReservationResponseDTO[]>;
  /** 예약 상세 조회 */
  getReservationDetail(id: string): Promise<ReservationResponseDTO | null>;
  /** 예약 생성 */
  createReservation(
    params: Omit<IReservation, 'id' | 'payment' | 'user' | 'information'>,
    time: {
      checkIn: string;
      checkOut: string;
    },
    userId: string,
    roomId: string,
  ): Promise<ReservationResponseDTO>;
  /** 예약 수정 */
  updateReservation(id: string, updateReservations: Omit<IReservation, 'id' | 'reserverName'>): Promise<void>;
  /** 예약 삭제 */
  deleteReservation(id: string): Promise<void>;
  /** 예약 취소 */
  patchCancelReservation(id: string): Promise<void>;
}
