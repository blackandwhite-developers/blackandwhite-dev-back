import LodgeResponseDto from '@/api/lodge/dto/lodgeResponse.dto';

export interface SearchService {
  search(keyword: string): Promise<Array<LodgeResponseDto>>;
  popularSearch(limit: number): Promise<Array<IPopularSearch>>;
}
