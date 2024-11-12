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
    role: {
      type: String,
      enum: ['user', 'admin', 'provider'],
      default: 'user',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const MongooseUser = mongoose.model<IUser>('users', userSchema);
