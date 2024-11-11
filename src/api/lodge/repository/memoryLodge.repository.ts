import HttpException from '@/api/common/exceptions/http.exception';
import LodgeRepository from './lodge.repository';
import { v4 as uuid } from 'uuid';
export default class MemoryLodgeRepository implements LodgeRepository {
  private static store: Map<string, ILodge> = new Map();
  async findById(id: string): Promise<ILodge> {
    const lodge = MemoryLodgeRepository.store.get(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    return lodge;
  }
  async save(data: ILodge): Promise<ILodge> {
    MemoryLodgeRepository.store.set(uuid(), data);
    return data;
  }
  async edit(id: string, data: ILodge): Promise<void> {
    const lodge = MemoryLodgeRepository.store.get(id);
    const newLodge = { ...lodge, ...data };
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    MemoryLodgeRepository.store.set(id, newLodge);
  }
  async delete(id: string): Promise<void> {
    const lodge = MemoryLodgeRepository.store.get(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    MemoryLodgeRepository.store.delete(id);
  }
}
