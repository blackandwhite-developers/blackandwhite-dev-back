import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  path: {
    type: String,
    unique: true,
    required: true,
  },
  thumbnail: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
  lodges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lodge' }],
  level: { type: Number, required: true, default: 0 },
  division: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category', default: [] }],
});

categorySchema.index({ division: 1 }); 

export const mongooseCategory = mongoose.model<ICategory>('category', categorySchema);
