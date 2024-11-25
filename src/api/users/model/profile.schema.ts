import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema<IProfile>(
  {
    /** 연락처 */
    phone: { type: String, required: true },
    /** 생년월일 */
    birth: { type: Date, required: true },
    /** 성별 */
    gender: { type: String, enum: ['M', 'F', 'E'], default: 'E', required: true },
    /** 관심사 */
    interest: {
      type: String,
      enum: ['호텔', '풀빌라', '게스트하우스', '전원주택', '비지니스호텔', '레저', '해외숙소'],
      required: true,
    },
    /** 닉네임 */
    nickname: { type: String, required: false },
    /** 프로필 사진 */
    profileImage: { type: String, required: false },
  },
  { timestamps: true },
);

export const MongooseProfile = mongoose.model<IProfile>('profile', profileSchema);
