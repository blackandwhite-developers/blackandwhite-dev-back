export class Reservation implements IReservation {
    /** 예약 ID */
    id: string;
    /** 입실 날짜 */
    startDate: Date;
    /** 퇴실 날짜 */
    endDate: Date;
    /** 어른 인원 */
    adult: number;
    /** 아이 인원 */
    child: number;
    /** 예약자 성함 */
    reserverName: Pick<IUser, 'id' | 'name'>;
    /** 예약자 연락처 */
    reserverNumber: Pick<IProfile, 'id' | 'phone'>;
    /** 객실 정보 */
    information: IPartialRoom;
    /** 예약 상태 */
    status: "active" | "cancel";

    constructor(params: IReservation) {
        this.id = params.id;
        this.startDate = new Date(params.startDate);
        this.endDate = new Date(params.endDate);
        this.adult = params.adult;
        this.child = params.child;
        this.reserverName = params.reserverName;
        this.reserverNumber = params.reserverNumber;
        this.information = params.information;
        this.status = params.status;
    }
}
