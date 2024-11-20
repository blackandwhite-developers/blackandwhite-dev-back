import mongoose from 'mongoose';

const popularSearchSchema = new mongoose.Schema<IPopularSearch>({
        searchTerm: { type: String, required: true, unique: true }, 
        count: { type: Number, default: 1 },
        timestamps: true,
    
});

export const MongoosePopularSearch = mongoose.model<IPopularSearch>('popularSearch', popularSearchSchema);