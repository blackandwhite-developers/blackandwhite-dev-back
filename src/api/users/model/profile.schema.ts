import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema<IProfile>(
  {
    /** 연락처 */
    phone: { type: String, required: true },
    /** 생년월일 */
    birth: { type: Date, required: true },
    /** 성별 */
    gender: { type: String, enum: ['M', 'F', 'E'], default: 'E', required: true },
    /** 주소 */
    address: { type: String, required: true },
    /** 상세주소 */
    addressDetail: { type: String, required: false },
    /** 관심사 */
    intereste: { type: String, required: false },
    /** 닉네임 */
    nickname: { type: String, required: false },
  },
  { timestamps: true },
);

export const MongooseProfile = mongoose.model<IProfile>('profile', profileSchema);
