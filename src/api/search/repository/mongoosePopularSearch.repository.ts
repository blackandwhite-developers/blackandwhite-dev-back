import { MongoosePopularSearch } from "../model/popularSearch.schema";
import { PopularSearchRepository } from "./popularSearch.repository";

export class MongoosePopularSearchRepository implements PopularSearchRepository{
    async save(searchTerm: string): Promise<IPopularSearch> {
        const existingSearch = await MongoosePopularSearch.findOne({ searchTerm });

        if (existingSearch) {
            await MongoosePopularSearch.updateOne(
                { searchTerm },
                { $inc: { count: 1 }, $set: { updatedAt: new Date() } }
            );
            return existingSearch;
        } else {
            const newSearch = new MongoosePopularSearch({ searchTerm, count: 1 });
            await newSearch.save();
            return newSearch;
        }
    }

    async findPopularSearch(duration: number, limit: number = 10): Promise<IPopularSearch[]> {
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - duration);

        return await MongoosePopularSearch.find({ updatedAt: { $gte: sinceDate } })
            .sort({ count: -1 })
            .limit(limit);
    }
}
