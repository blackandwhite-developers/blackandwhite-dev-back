interface IPopularSearch {
  /** 순위 */
  lank: number;
  /** 인기 검색어 */
  popularSearch: string;
}

interface ISearchKeywords {
  /** 검색어 */
  keyword: string;
  /** 검색 횟수 */
  count: number;
}
