export default interface SearchKeywordsRepository {
  getPopularSearch(limit: number): Promise<Array<IPopularSearch>>;
  getSearchKeywords(): Promise<Array<ISearchKeywords>>;
  addSearchKeyword(keyword: string): Promise<void>;
}
