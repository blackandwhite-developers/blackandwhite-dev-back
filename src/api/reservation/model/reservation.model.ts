export class Reservations implements IReservation {
    /** 예약 ID */
    id: string;
    /** 입실 날짜 */
    startDate: string;
    /** 퇴실 날짜 */
    endDate: string;
    /** 예약자 성함 */
    reserverName: IUser;
    /** 예약자 연락처 */
    reserverNumber: IProfile;
    /** 객실 정보 */
    information: IRoom;

    constructor(params: IReservation) {
        this.id = params.id;
        this.startDate = params.startDate;
        this.endDate = params.endDate;
        this.reserverName = params.reserverName;
        this.reserverNumber = params.reserverNumber;
        this.information = params.information;
    }
}
