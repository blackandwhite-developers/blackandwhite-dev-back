import HttpException from '@/api/common/exceptions/http.exception';
import RoomRepository from '../repository/room.repository';
import RoomService from './room.service.type';

export default class RoomServiceImpl implements RoomService {
  private readonly _roomRepository: RoomRepository;
  constructor(_roomRepository: RoomRepository) {
    this._roomRepository = _roomRepository;
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
  async createRoom(data: IRoom): Promise<IRoom> {
    const room = await this._roomRepository.create(data);
    return room;
  }
  async editRoom(id: string, data: Partial<IRoom>): Promise<IRoom> {
    const room = await this._roomRepository.update(id, data);
    return room;
  }
  async deleteRoom(id: string): Promise<void> {
    await this._roomRepository.delete(id);
  }
}
