import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseLodge } from '../model/lodge.schema';
import LodgeRepository from './lodge.repository';

export default class MongooseLodgeRepository implements LodgeRepository {
  async findById(id: string): Promise<ILodge> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new Error('숙소를 찾을 수 없습니다.');
    }
    return lodge;
  }
  async save(data: ILodge): Promise<ILodge> {
    const lodge = new MongooseLodge(data);
    await lodge.save();
    return lodge;
  }
  async edit(id: string, data: ILodge): Promise<void> {
    if (!MongooseLodge.findById(id).exists) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndUpdate(id, data);
  }
  async delete(id: string): Promise<void> {
    if (!MongooseLodge.findById(id).exists) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndDelete(id);
  }
}
