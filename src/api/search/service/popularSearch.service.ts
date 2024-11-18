import { PopularSearchResponseDTO } from "../dto/popularSearchReponse.dto";
import { PopularSearchRepository } from "../repository/popularSearch.repository";
import { PopularSearchService } from "./popularSearch.service.type";


export class PopularSearchServiceImpl implements PopularSearchService {
    private readonly _popularSearchRepository: PopularSearchRepository;

    constructor(
        _popularSearachRepository : PopularSearchRepository
    ) {
        this._popularSearchRepository = _popularSearachRepository;
    }

    async postPopularSearch(searchTerm: string): Promise<PopularSearchResponseDTO> {
        const popularSearch = await this._popularSearchRepository.save(searchTerm);

        return new PopularSearchResponseDTO(popularSearch);
    }

    async getPopularSearch(duration: number): Promise<PopularSearchResponseDTO[]> {
        const popularSearchList = await this._popularSearchRepository.findPopularSearch(duration);

        return popularSearchList.map(popularSearch => new PopularSearchResponseDTO(popularSearch));
    }
}
