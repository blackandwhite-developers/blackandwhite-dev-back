// [유저]
// 예약 조회 - getReservation
// 예약상세 조회 - getReservationDetail
// 예약 생성 - createReservation
// 예약 수정 - updateReservation
// 예약 삭제 - deleteReservation

import { NextFunction, Request, Response } from "express";
import { ReservationService } from "../service/reservation.service.type";
import RoomRepository from "../../room/repository/room.repository";

export default class ReservationController {
    private readonly _reservationService: ReservationService;
    private readonly _roomRepository: RoomRepository;

    constructor(
        _reservationService: ReservationService,
        _roomRepository: RoomRepository,
    ) {
        this._reservationService = _reservationService;
        this._roomRepository = _roomRepository;

        this.getReservation = this.getReservation.bind(this);
        this.getReservationDetail = this.getReservationDetail.bind(this);
        this.createReservation = this.createReservation.bind(this);
        this.updateReservation = this.updateReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.cancelReservation = this.cancelReservation.bind(this);
    }

    async getReservation(
        req: Request<
            getReservationRequest["path"],
            getReservationResponse,
            getReservationRequest["body"],
            getReservationRequest["params"]
        >,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {userId} = req.user;
            const reservations = await this._reservationService.getReservationByUserId(userId);

            res.send(reservations);
        } catch (error) {
            next(error);
        }
    }

    async getReservationDetail(
        req: Request<
            getReservationDetailRequest["path"],
            getReservationDetailResponse,
            getReservationDetailRequest["body"],
            getReservationDetailRequest["params"]
        >,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { id } = req.params;
            const reservation = await this._reservationService.getReservationDetail(id);

            res.send(reservation);
        } catch (error) {
            next(error);
        }
    }

    async createReservation(
        req: Request<
            createReservationRequest["path"],
            createReservationResponse,
            createReservationRequest["body"],
            createReservationRequest["params"]
        >,
        res: Response,
        next: NextFunction
    ) {
        const id = req.body.information.id as string;
        const reservation = await this._roomRepository.findById(id); 

        if (!reservation) {
            throw new Error("해당 정보가 존재하지 않습니다.");
        }
        try {
            const createReservation =
                await this._reservationService.createReservation({
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    adult: req.body.adult,
                    child: req.body.child,
                    reserverName: {
                        id: req.body.reserverName.id,
                        name: req.body.reserverName.name,
                    },
                    reserverNumber:{
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
                    status: req.body.status,
                    reservationType: req.body.reservationType
                });
            res.send(createReservation);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async updateReservation(
        req: Request<
            updateReservationRequest["path"],
            updateReservationResponse,
            updateReservationRequest["body"],
            updateReservationRequest["params"]
        >,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;

        try {
            await this._reservationService.updateReservation(
                id,
                req.body
            );

            res.status(204).json();
        } catch (error) {
            next(error);
        }
    }

    async deleteReservation(
        req: Request<
            deleteReservationRequest["path"],
            deleteReservationResponse,
            deleteReservationRequest["body"],
            deleteReservationRequest["params"]
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

    async cancelReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const reservation = await this._reservationService.patchCancelReservation(id);
            res.send(reservation);
        } catch (error) {
            next(error);
        }
    }
}