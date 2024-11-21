import mongoose from 'mongoose';

const lodgeSchema = new mongoose.Schema<ILodge>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addressDetail: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    phone: {
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
    room: [
      {
        roomType: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'room',
          },
        ],
        stock: {
          type: Number,
          required: true,
        },
      },
    ],
    categoryId: {
      type: String,
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
    price: {
      type: Number
    },
    distance:{
      type: String
    },
    count: {
      type:Number
    },
    categoryName: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  
);

export const MongooseLodge = mongoose.model<ILodge>('lodge', lodgeSchema);
