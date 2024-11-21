import HttpException from '@/api/common/exceptions/http.exception';
import LodgeResponseDto from '../dto/lodgeResponse.dto';
import LodgeRepository from '../repository/lodge.repository';
import LodgeService from './lodge.service.type';
import { CategoryRepository } from '@/api/category/repository/category.repository';

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

export default class LodgeServiceImpl implements LodgeService {
  private readonly _lodgeRepository: LodgeRepository;
  private readonly _categoryRepository: CategoryRepository;
  constructor(_lodgeRepository: LodgeRepository, _categoryRepository: CategoryRepository) {
    this._lodgeRepository = _lodgeRepository;
    this._categoryRepository = _categoryRepository;
  }
  async getLodgesByCategory(categoryId: string): Promise<ILodge[]> {
    return await this._lodgeRepository.findByCategory(categoryId);
  }

  async getLodge(id: string): Promise<LodgeResponseDto> {
    const lodge = await this._lodgeRepository.findById(id);
    return new LodgeResponseDto(lodge);
  }
  async postLodge(data: Omit<ILodge, 'id' | 'lat' | 'lng' | 'room'>, categoryId: string): Promise<LodgeResponseDto> {
    if (!data.address || data.address.trim() === '') {
      throw new HttpException(400, '주소를 입력해주세요.');
    }
    const baseUrl = `https://dapi.kakao.com/v2/local/search/address.json`;
    const params = new URLSearchParams({ query: data.address });
    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new HttpException(404, '주소를 찾을 수 없습니다.');
    }

    const result = await response.json();

    if (!result.documents || result.documents.length === 0) {
      console.error('주소 검색 실패:', result);
      throw new HttpException(404, '유효한 주소가 아닙니다.');
    }

    const category = await this._categoryRepository.getCategory(categoryId);

    if (!category) {
      throw new HttpException(404, '카테고리를 찾을 수 없습니다.');
    }

    const { x, y } = result.documents[0];
    const newLodge = {
      ...data,
      category,
      lat: y,
      lng: x,
      room: [],
    };
    const lodge = await this._lodgeRepository.save(newLodge);

    return new LodgeResponseDto(lodge);
  }
  async putLodge(id: string, data: Partial<ILodge>): Promise<void> {
    await this._lodgeRepository.edit(id, data);
  }
  async deleteLodge(id: string): Promise<void> {
    await this._lodgeRepository.delete(id);
  }
}
