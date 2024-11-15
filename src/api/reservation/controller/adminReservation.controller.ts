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
            const reservationDetail = await this._reservationService.getReservationDetail(req.params.id);

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
        const roomid = req.body.information.id as string;
        const reservation = await this._roomRepository.findById(roomid);

        if (!reservation) {
            throw new Error("해당 정보가 존재하지 않습니다.");
        }
        try {
            const createReservation = await this._reservationService.createReservation({
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                adult: req.body.adult,
                child: req.body.child,
                reserverName: {
                    id: req.body.reserverName.id,
                    name: req.body.reserverName.name,
                },
                reserverNumber: {
                    id: req.body.reserverNumber.id,
                    phone: req.body.reserverNumber.phone,
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
                        checkIn: reservation.time.checkIn,
                        checkOut: reservation.time.checkOut,
                    },
                    price: {
                        price: reservation.price.price,
                        discount: reservation.price.discount,
                        additionalPrice: reservation.price.additionalPrice,
                    }
                },
                status: req.body.status
            });
            res.send(createReservation);
        } catch (error) {
            next(error);
        }
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
