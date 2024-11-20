export default interface RoomRepository {
  /** 객실 생성 */
  create(data: Omit<IRoom, 'id'>): Promise<IRoom>;
  /** 객실 목록 조회 */
  findAll(): Promise<IRoom[]>;
  /** ID로 객실 조회 */
  findById(id: string): Promise<IRoom | null>;
  /** 객실 수정 */
  update(roomId: string, updateRoomInfo: Partial<IRoom>): Promise<IRoom>;
  /** 객실 삭제 */
  delete(roomId: string): Promise<void>;
}
