import { MongooseRecentSearch } from '../model/recentSearch.schema';
import { RecentSearchRepository } from '../repository/recentSearch.repository';

export class MongooseRecentSearchRepository implements RecentSearchRepository{
    async save(userId: string, searchTerm: string): Promise<IRecentSearch> {
        const newRecentSearch = new MongooseRecentSearch(userId, searchTerm);

        await newRecentSearch.save()
        return newRecentSearch;
    }

    async findByUserId(userId: string): Promise<IRecentSearch[]> {
        const values = await MongooseRecentSearch.find({userId})

        .sort({ createdAt: -1 })
        .limit(8);

        return values;
    }
}