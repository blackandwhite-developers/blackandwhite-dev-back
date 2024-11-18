import HttpException from "@/api/common/exceptions/http.exception";
import { RecentSearchResponseDTO } from "../dto/recentSearchResponse.dto";
import { RecentSearchRepository } from "../repository/recentSearch.repository";
import { RecentSearchService } from "./recentSearch.service.type";

export default class RecentSearchServiceImpl implements RecentSearchService {
    private readonly _recentSearchRepository: RecentSearchRepository;

    constructor(_recentSearchRepository: RecentSearchRepository){
        this._recentSearchRepository = _recentSearchRepository;
    }

    async postRecentSearch(userId:string, searchTerm: string): Promise<RecentSearchResponseDTO> {
        const recentSearch = await this._recentSearchRepository.save(userId, searchTerm);
        return new RecentSearchResponseDTO(recentSearch);
    }

    async getRecentSearch(userId:string): Promise<RecentSearchResponseDTO[]> {
        const recentSearchList = await this._recentSearchRepository.findByUserId(userId);

        if (!recentSearchList || recentSearchList.length === 0) {
            throw new HttpException(404, "최근 검색어를 찾을 수 없습니다.");
        }

        return recentSearchList.map(search => new RecentSearchResponseDTO(search));
    }
}