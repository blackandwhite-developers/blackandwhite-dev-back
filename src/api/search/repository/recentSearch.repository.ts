export interface RecentSearchRepository {
    /** 검색어 추가 */ 
    save(userId: string, searchTerm: string): Promise<IRecentSearch>;
    /** 최근 검색어 찾기 */
    findByUserId(userId: string): Promise<IRecentSearch[]>;
}