import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseRoom } from '../model/room.schema';
import RoomRepository from './room.repository';
import { MongooseLodge } from '@/api/lodge/model/lodge.schema';

export default class MongooseRoomRepository implements RoomRepository {
  async create(data: Omit<IRoom, 'id'>): Promise<IRoom> {
    const { lodgeId } = data;
    if (!lodgeId) {
        throw new HttpException(400, 'lodgeId는 필수 입니다.'); 
    }

    const lodgeExists = await MongooseLodge.findById(lodgeId);
    if (!lodgeExists) {
        throw new HttpException(404, 'lodgeId에 해당하는 숙소를 찾을 수 없습니다.');
    }

    const room = new MongooseRoom(data);
    await room.save();
    return room;
  }
  async findAll(): Promise<IRoom[]> {
    const rooms = await MongooseRoom.find();
    return rooms;
  }
  async findById(id: string): Promise<IRoom> {
    const room = await MongooseRoom.findById(id);
    if (!room) {
      throw new HttpException(404, '해당 객실을 찾을 수 없습니다.');
    }
    return room;
  }
  async update(roomId: string, updateRoomInfo: Partial<IRoom>): Promise<IRoom> {
    const room = await MongooseRoom.findByIdAndUpdate(roomId, updateRoomInfo, { new: true });
    if (!room) {
      throw new HttpException(404, '해당 객실을 찾을 수 없습니다.');
    }
    return room;
  }
  async delete(roomId: string): Promise<void> {
    await MongooseRoom.findOneAndDelete({ _id: roomId });
  }
}
