import mongoose from 'mongoose';

const searchKeywordsSchema = new mongoose.Schema<ISearchKeywords>({
  keyword: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

export const mongooseSearchKeywords = mongoose.model<ISearchKeywords>('searchKeywords', searchKeywordsSchema);
