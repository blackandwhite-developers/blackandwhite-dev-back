import { RecentSearchResponseDTO } from "../dto/recentSearchResponse.dto";

export interface RecentSearchService {
    postRecentSearch(userId: string, searchTerm: string): Promise<RecentSearchResponseDTO>;
    getRecentSearch(userId: string): Promise<RecentSearchResponseDTO[]>;
}