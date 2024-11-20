import HttpException from '@/api/common/exceptions/http.exception';
import RoomRepository from '../repository/room.repository';
import RoomService from './room.service.type';
import LodgeRepository from '@/api/lodge/repository/lodge.repository';

export default class RoomServiceImpl implements RoomService {
  private readonly _roomRepository: RoomRepository;
  private readonly _lodgeRepository: LodgeRepository;
  constructor(_roomRepository: RoomRepository, _lodgeRepository: LodgeRepository) {
    this._roomRepository = _roomRepository;
    this._lodgeRepository = _lodgeRepository;
  }
  async getRooms(): Promise<IRoom[]> {
    const rooms = await this._roomRepository.findAll();
    return rooms;
  }
  async getRoom(id: string): Promise<IRoom> {
    const room = await this._roomRepository.findById(id);
    if (!room) {
      throw new HttpException(404, '해당 객실을 찾을 수 없습니다.');
    }
    return room;
  }
  async createRoom(data: IRoom, count: number): Promise<IRoom> {
    const room = await this._roomRepository.create(data);
    const lodge = await this._lodgeRepository.findById(data.lodgeId);
    if (!lodge) {
      throw new HttpException(404, '해당 숙소를 찾을 수 없습니다.');
    }
    await this._lodgeRepository.addRoomType(data.lodgeId, room, count);
    return room;
  }
  async editRoom(id: string, data: Partial<IRoom>): Promise<IRoom> {
    const room = await this._roomRepository.update(id, data);
    return room;
  }
  async deleteRoom(id: string): Promise<void> {
    await this._roomRepository.delete(id);
  }

  async getRoomTime(roomId: string): Promise<IRoomTime> {
    const room = await this._roomRepository.findById(roomId);
    if (!room) {
        throw new HttpException(404, '해당 객실을 찾을 수 없습니다.'); 
    }

    return room.time;
  }
}
