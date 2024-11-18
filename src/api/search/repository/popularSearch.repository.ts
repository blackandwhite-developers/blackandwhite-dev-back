export interface PopularSearchRepository {
    save(searchTerm: string): Promise<IPopularSearch>;
    findPopularSearch(duration: number): Promise<IPopularSearch[]>;
}