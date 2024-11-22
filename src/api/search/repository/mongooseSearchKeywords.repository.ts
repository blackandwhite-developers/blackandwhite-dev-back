import { mongooseSearchKeywords } from '../model/searchKeywords.schema';
import SearchKeywordsRepository from './searchKeywords.repository';

export default class MongooseSearchKeywordsRepository implements SearchKeywordsRepository {
  async getPopularSearch(limit: number): Promise<Array<IPopularSearch>> {
    return mongooseSearchKeywords.aggregate([{ $sort: { count: -1 } }, { $limit: limit }]);
  }

  async getSearchKeywords(): Promise<Array<ISearchKeywords>> {
    return mongooseSearchKeywords.find();
  }

  async addSearchKeyword(keyword: string): Promise<void> {
    const searchKeyword = await mongooseSearchKeywords.findOne({ keyword });
    if (searchKeyword) {
      searchKeyword.count += 1;
      await searchKeyword.save();
    } else {
      await mongooseSearchKeywords.create({ keyword });
    }
  }
}
