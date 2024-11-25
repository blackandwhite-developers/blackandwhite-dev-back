import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema<IReservation>({
  /** 입실 날짜 */
  startDate: { type: String },
  /** 퇴실 날짜 */
  endDate: { type: String },
  /** 어른 인원 */
  adult: { type: Number },
  /** 아이 인원 */
  child: { type: Number },
  /** 예약자 성함 */
  reserver: {
    /** 이름 */
    reserverName: { type: String, required: true },
    /** 연락처 */
    reserverPhone: { type: String, required: true },
  },
  /** 객실 정보 */
  information: {
    /** 객실 시설 */
    time: {
      /** 입실 시간 */
      checkIn: { type: String },
      /** 퇴실 시간 */
      checkOut: { type: String },
    },
  },
  status: {
    type: String,
    enum: ['active', 'cancel'],
    default: 'active',
    required: true,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'payments',
    nullable: true,
  },
  /** 예약 객실 ID */
  roomId: { type: String, required: true },
});

export const MongooseReservation = mongoose.model<IReservation>('reservations', reservationSchema);
