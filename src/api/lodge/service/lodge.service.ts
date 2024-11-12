import LodgeResponseDto from '../dto/lodgeResponse.dto';
import LodgeRepository from '../repository/lodge.repository';
import LodgeService from './lodge.service.type';

export default class LodgeServiceImpl implements LodgeService {
  private readonly _lodgeRepository: LodgeRepository;
  constructor(_lodgeRepository: LodgeRepository) {
    this._lodgeRepository = _lodgeRepository;
  }
  async getLodge(id: string): Promise<LodgeResponseDto> {
    const lodge = await this._lodgeRepository.findById(id);
    return new LodgeResponseDto(lodge);
  }
  async postLodge(data: ILodge): Promise<LodgeResponseDto> {
    const lodge = await this._lodgeRepository.save(data);
    return new LodgeResponseDto(lodge);
  }
  async putLodge(id: string, data: ILodge): Promise<void> {
    const lodge = await this._lodgeRepository.findById(id);
    const newLodge = { ...lodge, ...data };
    await this._lodgeRepository.edit(id, newLodge);
  }
  async deleteLodge(id: string): Promise<void> {
    await this._lodgeRepository.delete(id);
  }
}
