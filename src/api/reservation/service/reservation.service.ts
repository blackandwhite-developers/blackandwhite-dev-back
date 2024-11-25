import HttpException from '@/api/common/exceptions/http.exception';
import { ReservationResponseDTO } from '../dto/reservationResponse.dto';
import { ReservationRepository } from '../repository/reservation.repository';
import { ReservationService } from './reservation.service.type';
import RoomService from '@/api/room/service/room.service.type';
import { UserRepository } from '@/api/users/respository/user/user.repository';
import LodgeRepository from '@/api/lodge/repository/lodge.repository';

export default class ReservationServiceImpl implements ReservationService {
  private readonly _reservationRepository: ReservationRepository;
  private readonly _roomService: RoomService;
  private readonly _lodgeRepository: LodgeRepository;
  private readonly _userRepository: UserRepository;
  constructor(
    _reservationRepository: ReservationRepository,
    _roomService: RoomService,
    _lodgeRepository: LodgeRepository,
    _userRepository: UserRepository,
  ) {
    this._reservationRepository = _reservationRepository;
    this._roomService = _roomService;
    this._lodgeRepository = _lodgeRepository;
    this._userRepository = _userRepository;
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

  async createReservation(
    params: Omit<IReservation, 'id' | 'payment' | 'user' | 'information' | 'roomId'>,
    time: {
      checkIn: string;
      checkOut: string | null;
    },
    userId: string,
    roomId: string,
  ): Promise<ReservationResponseDTO> {
    const user = await this._userRepository.findById(userId);
    const room = await this._roomService.getRoom(roomId);
    if (!user) {
      throw new HttpException(404, '사용자를 찾을 수 없습니다.');
    }

    let checkIn: string = time.checkIn;
    let checkOut: string = time.checkOut || '';

    const newReservation = await this._reservationRepository.save(
      {
        ...params,
        information: {
          ...room,
          time: { checkIn, checkOut },
        },
        roomId,
      },
      user,
    );

    if (!newReservation) {
      throw new HttpException(500, '예약 생성에 실패했습니다.');
    }
    const lodge = await this._lodgeRepository.findByRoomId(roomId);
    console.log(lodge.id, room.name);
    await this._lodgeRepository.checkIn(lodge.id, room.name);

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
