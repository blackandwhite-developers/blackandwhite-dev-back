import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema<IReservation>({
    /** 예약자 성함 */
    reserverName: {
        /** 사용자 ID */
        id: { type: String, required: true },
        /** 이름 */
        name: { type: String },
    },
    /** 예약자 연락처 */
    reserverNumber: {
        /** 프로필 ID */
        id: { type: String, required: true },
        /** 연락처 */
        phone: { type: String },
    },
    /** 객실 정보 */
    information: {
        /* 객실 ID */
        id: { type: String, required: true },
        /** 객실 이름 */
        name: { type: String },
        /** 객실 이미지 */
        image: { type: String },
        /** 어른 인원 */
        adult: { type: Number },
        /** 아이 인원 */
        child: { type: Number },
        /** 기준 인원 */
        standardCapacity: {type: Number },
        /** 최대 인원 */
        maxCapacity: { type: Number },
        /** 객실 가격 */
        price: { type: Number },
        /** 입실 시간 */
        checkIn: { type: Date },
        /** 퇴실 시간 */
        checkOut: { type: Date },
    }

});

export const MongooseReservation = mongoose.model<IReservation>("Reservation", reservationSchema);