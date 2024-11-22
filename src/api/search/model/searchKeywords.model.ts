export default class SearchKeywords implements ISearchKeywords {
  keyword: string;
  count: number;
  constructor(params: ISearchKeywords) {
    this.keyword = params.keyword;
    this.count = params.count;
  }
}
