import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  thumbnail: { type: String },
  division: { type: String, unique: true },
});

export const mongooseCategory = mongoose.model<ICategory>('category', categorySchema);
