import mongoose from 'mongoose';

const recentSearchSchema = new mongoose.Schema<IRecentSearch>({
    userId: { 
        id: {type: String, required: true },
    },
    searchTerm: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const MongooseRecentSearch = mongoose.model<IRecentSearch>('recentSearch', recentSearchSchema);