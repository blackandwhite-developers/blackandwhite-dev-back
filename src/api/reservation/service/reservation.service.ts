import HttpException from '@/api/common/exceptions/http.exception';
import { ReservationResponseDTO } from '../dto/reservationResponse.dto';
import { ReservationRepository } from '../repository/reservation.repository';
import { ReservationService } from './reservation.service.type';
import RoomService from '@/api/room/service/room.service.type';

export default class ReservationServiceImpl implements ReservationService {
  private readonly _reservationRepository: ReservationRepository;
  private readonly _roomService: RoomService;

  constructor(
    _reservationRepository: ReservationRepository,
    _roomService: RoomService
  ) {
    this._reservationRepository = _reservationRepository;
    this._roomService = _roomService;
  }

  async getReservation(): Promise<ReservationResponseDTO[]> {
    const reservations = await this._reservationRepository.findAll();
    const newList = await Promise.all(reservations.map(Reservations => new ReservationResponseDTO(Reservations)));

    return newList;
  }

  async getReservationByUserId(userId: string): Promise<ReservationResponseDTO[]> {
    if (!userId) throw new HttpException(404, 'UserID 값은 필수입니다.');

    const reservations = await this._reservationRepository.findByUserId(userId);

    return reservations.map(reservation => new ReservationResponseDTO(reservation));
  }

  async getReservationDetail(reservationId: string): Promise<ReservationResponseDTO | null> {
    const reservations = await this._reservationRepository.findById(reservationId);

    if (!reservations) {
      throw new HttpException(404, '예약을 찾을 수 없습니다.');
    }

    return new ReservationResponseDTO(reservations);
  }

  async createReservation(params: Omit<IReservation, 'id'>): Promise<ReservationResponseDTO> {
    const { reservationType, startDate, information } = params;

    let checkIn: string;
    let checkOut: string;

    if (reservationType === 'shortStay') {
        if (!params.information.time || !params.information.time.checkIn || !params.information.time.checkOut) {
            throw new HttpException(400, '대실의 경우 체크인, 체크아웃 시간은 필수입니다.');
        }
        checkIn = params.information.time.checkIn;
        checkOut = params.information.time.checkOut;

        const start = new Date(`${startDate}T${checkIn}`).getTime();
        const end = new Date(`${startDate}T${checkOut}`).getTime();
        const diffInHours = (end - start) / (1000 * 60 * 60);

        if (diffInHours > 4) {
            throw new HttpException(400, '대실의 경우 최대이용시간은 4시간입니다.');
        }
    } else if (reservationType === 'overnight') {
        const roomTime = await this._roomService.getRoomTime(params.information.id);
        checkIn = roomTime.checkIn;
        checkOut = roomTime.checkOut;
    } else {
        throw new HttpException(400, '숙박 또는 대실을 선택해야합니다.');
    }

    const newReservation = await this._reservationRepository.save({
        ...params,
        information: {
            ...params.information,
            time: { checkIn, checkOut }, 
        },
    });

    return new ReservationResponseDTO(newReservation);
}

  async updateReservation(
    reservationId: string,
    updateReservations: Omit<IReservation, 'id' | 'reserverName' | 'information'>,
  ): Promise<void> {
    await this._reservationRepository.update(reservationId, updateReservations);

    return;
  }
  async deleteReservation(reservationId: string): Promise<void> {
    await this._reservationRepository.delete(reservationId);

    return;
  }

  async patchCancelReservation(id: string): Promise<void> {
    const findReservation = await this._reservationRepository.findById(id);

    if (!findReservation) {
      throw new HttpException(404, '예약내역을 찾을 수 없습니다.');
    }
    await this._reservationRepository.cancel(id);

    return;
  }
}
