import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseLodge } from '../model/lodge.schema';
import LodgeRepository from './lodge.repository';

export default class MongooseLodgeRepository implements LodgeRepository {
  async findByCategory(categoryId: string): Promise<ILodge[]> {
    const lodge = await MongooseLodge.find({ categoryId });
    return lodge;
  }

  async findById(id: string): Promise<ILodge> {
    const lodge = await MongooseLodge.findById(id).populate('category');
    if (!lodge) {
      throw new Error('숙소를 찾을 수 없습니다.');
    }
    return lodge;
  }

  async save(data: Omit<ILodge, 'id'>): Promise<ILodge> {
    const lodge = new MongooseLodge(data);
    await lodge.save();
    return lodge;
  }

  async edit(id: string, data: Partial<ILodge>): Promise<void> {
    if (!MongooseLodge.findById(id)) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    if (!MongooseLodge.findById(id)) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndDelete(id);
  }

  async addRoomType(id: string, room: IRoom, count: number): Promise<void> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    if (lodge.room.some(r => r.roomType.name === room.name)) {
      throw new HttpException(400, '이미 등록된 객실입니다.');
    }
    const newTypeAndStock: IRoomTypeAndStock = {
      roomType: room,
      stock: count,
    };
    lodge.room = [...lodge.room, newTypeAndStock];
    console.log(lodge.room);
    await lodge.save();
  }

  async checkIn(id: string, roomName: string): Promise<void> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    const room = lodge.room.find(r => r.roomType.name === roomName);
    if (!room) {
      throw new HttpException(404, '객실을 찾을 수 없습니다.');
    }
    room.stock -= 1;
    await lodge.save();
  }
  async checkOut(id: string, roomName: string): Promise<void> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    const room = lodge.room.find(r => r.roomType.name === roomName);
    if (!room) {
      throw new HttpException(404, '객실을 찾을 수 없습니다.');
    }
    room.stock += 1;
    await lodge.save();
  }
  async findByRoomId(roomId: string): Promise<ILodge> {
    console.log(roomId);

    const lodges = await MongooseLodge.find();
    const lodge = lodges.filter(lodge => {
      return lodge.room.some(room => room.roomType.id === roomId);
    });
    const data = lodge[0];
    if (!data) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    return data;
  }
}
