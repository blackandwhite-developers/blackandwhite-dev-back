export default interface RoomService {
  getRoom(id: string): Promise<void>;
  createRoom(data: IRoom): Promise<void>;
  editRoom(id: string, data: IRoom): Promise<void>;
  deleteRoom(id: string): Promise<void>;
}
