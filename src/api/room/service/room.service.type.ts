export default interface RoomService {
  getRooms(): Promise<IRoom[]>;
  getRoom(id: string): Promise<IRoom>;
  createRoom(data: IRoom): Promise<IRoom>;
  editRoom(id: string, data: IRoom): Promise<void>;
  deleteRoom(id: string): Promise<void>;
}
