import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'provider'],
      default: 'user',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      required: true,
    },
    terms: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'terms',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['local', 'kakao', 'naver', 'apple'],
      required: true,
    },
    point: {
      type: Number,
      default: 0,
    },
    coupon: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupon',
      },
    ],
  },

  {
    timestamps: true,
  },
);
export const MongooseUser = mongoose.model<IUser>('users', userSchema);
