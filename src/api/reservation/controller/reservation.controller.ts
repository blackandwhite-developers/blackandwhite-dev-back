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
        const informationData = await this._reservationRepository.findById(id); //IRoom 레포지토리가 들어와야함 

        if (!informationData) {
            throw new Error("해당 정보가 존재하지 않습니다.");
        }
        try {
            const createReservation =
                await this._reservationService.createReservation({
                    reserverName: { //IPartialUser가 필요
                        id: req.body.reserverName.id,
                        name: req.body.reserverName.name,
                    },
                    information: {
                        id: informationData.id,
                        name: informationData.name,
                        image: informationData.image,
                        adult: informationData.adult,
                        child: informationData.child,
                        standardCapacity: informationData.standardCapacity,
                        maxCapacity: informationData.maxCapacity,
                        price: informationData.price,
                        checkin: informationData.checkIn,
                        checkout: informationData.checkOut,
                    },
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
}