// [유저]
// 예약 조회 - getReservation
// 예약상세 조회 - getReservationDetail
// 예약 생성 - createReservation
// 예약 수정 - updateReservation
// 예약 삭제 - deleteReservation

import { NextFunction, Request, Response } from "express";
import { ReservationService } from "../service/reservation.service.type";
import { ReservationRepository } from "../repository/reservation.repository";

export default class ReservationController {
    private readonly _reservationService: ReservationService;
    private readonly _reservationRepository: ReservationRepository;

    constructor(
        _reservationService: ReservationService,
        _reservationRepository: ReservationRepository,
    ) {
        this._reservationService = _reservationService;
        this._reservationRepository = _reservationRepository;

        this.getReservation = this.getReservation.bind(this);
        this.getReservationDetail = this.getReservationDetail.bind(this);
        this.createReservation = this.createReservation.bind(this);
        this.updateReservation = this.updateReservation.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
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
            const reservations = await this._reservationService.getReservation();

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
        const { id } = req.params;
        try {
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
        const reservation = await this._reservationRepository.findById(id); //IRoom 레포지토리가 들어와야함 

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
                        name: reservation.information.name,
                        image: reservation.information.image,
                        capacity: {
                            standard: reservation.information.capacity.standard,
                            maximum: reservation.information.capacity.maximum,
                        },
                        time: {
                            checkIn: reservation.information.time.checkIn,
                            checkOut: reservation.information.time.checkOut,
                        },
                        price: {
                            price: reservation.information.price.price,
                            discount: reservation.information.price.discount,
                            additionalPrice: reservation.information.price.additionalPrice,
                        } 
                    },
                    status: req.body.status
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