import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema<IReservation>({
  /** 입실 날짜 */
  startDate: { type: Date },
  /** 퇴실 날짜 */
  endDate: { type: Date },
  /** 어른 인원 */
  adult: { type: Number },
  /** 아이 인원 */
  child: { type: Number },
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
    /** 객실 인원 */
    capacity: {
      /** 기준 인원 */
      standard: { type: Number },
      /** 최대 인원 */
      maximum: { type: Number },
    },
    /** 객실 시설 */
    time: {
      /** 입실 시간 */
      checkIn: { type: String },
      /** 퇴실 시간 */
      checkOut: { type: String },
    },
    /** 객실 가격 */
    price: {
      /** 객실 가격 */
      price: { type: Number },
      /** 할인율 */
      discount: { type: Number },
      /** 인원 당 추가 가격 */
      additionalPrice: { type: Number },
    },
  },
  status: {
    type: String,
    enum: ['active', 'cancel'],
    default: 'active',
    required: true,
  },
});

export const MongooseReservation = mongoose.model<IReservation>('reservations', reservationSchema);
