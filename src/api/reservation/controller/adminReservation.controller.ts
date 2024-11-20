// [관리자]
// 예약 목록 조회 - getReservation
// 예약 상세 조회 - getReservationDetail
// 예약 생성 - createReservation
// 예약 수정 - updateReservation
// 예약 삭제 - deleteReservation
// 예약 취소 - cancelReservation

import { NextFunction, Request, Response } from "express";
import { ReservationService } from "../service/reservation.service.type";
import RoomRepository from "../../room/repository/room.repository";

export default class AdminReservationController {
  constructor(
    private _reservationService: ReservationService,
    private _roomRepository: RoomRepository
  ) {
    this.getReservation = this.getReservation.bind(this);
    this.getReservationDetail = this.getReservationDetail.bind(this);
    this.createReservation = this.createReservation.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
    this.deleteReservation = this.deleteReservation.bind(this);
    this.patchCancelReservation = this.patchCancelReservation.bind(this);
  }

  /** 예약 목록 조회 (관리자) */
  async getReservation(req: Request<
    adminGetReservationRequest["path"],
    adminGetReservationResponse,
    adminGetReservationRequest["body"],
    adminGetReservationRequest["params"]
  >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reservation = await this._reservationService.getReservation();
      res.send(reservation);
    } catch (error) {
      next(error);
    }
  }

  /** 예약 상세 조회 (관리자) */
  async getReservationDetail(req: Request<
    adminGetReservationDetailRequest["path"],
    adminGetReservationDetailResponse,
    adminGetReservationDetailRequest["body"],
    adminGetReservationDetailRequest["params"]
  >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const reservationDetail = await this._reservationService.getReservationDetail(id);

      res.send(reservationDetail);
    } catch (error) {
      next(error);
    }
  }

  /** 예약 생성 (관리자) */
  async createReservation(req: Request<
    adminCreateReservationRequest["path"],
    adminCreateReservationResponse,
    adminCreateReservationRequest["body"],
    adminCreateReservationRequest["params"]
  >,
    res: Response,
    next: NextFunction
  ) {
    const id = req.body.information.id as string;
    const reservation = await this._roomRepository.findById(id);
  
    if (!reservation) {
      throw new Error('해당 정보가 존재하지 않습니다.');
    }
  
    try {
      let checkIn: string;
      let checkOut: string;
  
      if (req.body.reservationType === 'shortStay') {
        if (!req.body.information.time?.checkIn || !req.body.information.time?.checkOut) {
          throw new Error('shortStay 타입 예약에는 checkIn 및 checkOut 시간이 필요합니다.');
        }
        checkIn = req.body.information.time.checkIn;
        checkOut = req.body.information.time.checkOut;
  
        const checkInTime = this.convertTo24Hour(checkIn);
        const checkOutTime = this.convertTo24Hour(checkOut);
  
        const duration = checkOutTime - checkInTime;
        if (duration > 4 * 60) {
          throw new Error('대실 예약은 4시간을 초과할 수 없습니다.');
        }
  
        if (checkOutTime <= checkInTime) {
          throw new Error('checkOut 시간이 checkIn 시간보다 앞설 수 없습니다.');
        }
  
      } else if (req.body.reservationType === 'overnight') {
        checkIn = reservation.time.checkIn;
        checkOut = reservation.time.checkOut;
      } else {
        throw new Error('유효하지 않은 예약 타입입니다.');
      }
  
      const createReservation = await this._reservationService.createReservation({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        adult: req.body.adult,
        child: req.body.child,
        userId: req.body.userId,
        reserver: {
          reserverName: req.body.reserver.reserverName,
          reserverPhone: req.body.reserver.reserverPhone,
        },
        information: {
          id: reservation.id,
          name: reservation.name,
          image: reservation.image,
          capacity: {
            standard: reservation.capacity.standard,
            maximum: reservation.capacity.maximum,
          },
          time: {
            checkIn,
            checkOut,
          },
          price: {
            price: reservation.price.price,
            discount: reservation.price.discount,
            additionalPrice: reservation.price.additionalPrice,
          },
        },
        status: req.body.status,
        reservationType: req.body.reservationType,
      });
  
      res.send(createReservation);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
  convertTo24Hour(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /** 예약 수정 (관리자) */
  async updateReservation(
    req: Request<
      adminUpdateReservationRequest["path"],
      adminUpdateReservationResponse,
      adminUpdateReservationRequest["body"],
      adminUpdateReservationRequest["params"]
    >,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    try {

      await this._reservationService.updateReservation(id, req.body);

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  /** 예약 삭제 (관리자) */
  async deleteReservation(req: Request<
    adminDeleteReservationRequest["path"],
    adminDeleteReservationResponse,
    adminDeleteReservationRequest["body"],
    adminDeleteReservationRequest["params"]
  >,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      await this._reservationService.deleteReservation(id);

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  /** 예약 취소 (관리자) */
  async patchCancelReservation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this._reservationService.patchCancelReservation(id);
      res.status(200).send({ message: 'Reservation approved' });
    } catch (error) {
      res.status(500).send({ message: 'Error approving reservation', error });
    }
  }
}
