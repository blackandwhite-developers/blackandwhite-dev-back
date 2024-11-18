import HttpException from '@/api/common/exceptions/http.exception';
import LodgeResponseDto from '../dto/lodgeResponse.dto';
import LodgeRepository from '../repository/lodge.repository';
import LodgeService from './lodge.service.type';

const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

export default class LodgeServiceImpl implements LodgeService {
  private readonly _lodgeRepository: LodgeRepository;
  constructor(_lodgeRepository: LodgeRepository) {
    this._lodgeRepository = _lodgeRepository;
  }
  async getLodge(id: string): Promise<LodgeResponseDto> {
    const lodge = await this._lodgeRepository.findById(id);
    return new LodgeResponseDto(lodge);
  }
  async postLodge(data: Omit<ILodge, 'id' | 'lat' | 'lng' | 'room'>): Promise<LodgeResponseDto> {
    const baseUrl = `https://dapi.kakao.com/v2/local/search/address.json`;
    const params = new URLSearchParams({ query: data.address });
    const url = `${baseUrl}?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });
    console.log(await response);
    if (!response.ok) {
      throw new HttpException(404, '주소를 찾을 수 없습니다.');
    }
    const result = await response.json();
    const { x, y } = result.documents[0];
    const newLodge = {
      ...data,
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
