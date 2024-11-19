import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema<IRoom>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  capacity: {
    type: {
      standard: {
        type: Number,
        required: true,
      },
      maximum: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  time: {
    type: {
      checkIn: {
        type: String,
        required: true,
      },
      checkOut: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  price: {
    type: {
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      additionalPrice: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: [String],
    required: true, // TODO: 리뷰 모델 추가
  },
  event: {
    type: String,
    required: true,
  },
});

export const MongooseRoom = mongoose.model<IRoom>('rooms', roomSchema);
