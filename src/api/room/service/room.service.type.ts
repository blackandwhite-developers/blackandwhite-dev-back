export default interface RoomService {
  getRooms(): Promise<IRoom[]>;
  getRoom(id: string): Promise<IRoom>;
  createRoom(data: IRoom, count: number): Promise<IRoom>;
  editRoom(id: string, data: IRoom): Promise<IRoom>;
  deleteRoom(id: string): Promise<void>;
  getRoomTime(roomid:string):Promise<IRoomTime>
}
