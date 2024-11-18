import { PopularSearchResponseDTO } from "../dto/popularSearchReponse.dto"


export interface PopularSearchService {
    postPopularSearch (searchTerm: string): Promise<PopularSearchResponseDTO>;
    
    getPopularSearch(duration: number): Promise<PopularSearchResponseDTO[]>
}
