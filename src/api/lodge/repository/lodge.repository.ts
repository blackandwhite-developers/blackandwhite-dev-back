export default interface LodgeRepository {
  /** 카테고리 ID로 조회 */
  findByCategory(categoryId: string): Promise<ILodge[]>;
  /** 숙소 조회 */
  findById(id: string): Promise<ILodge>;
  /** 숙소 등록 */
  save(data: Omit<ILodge, 'id'>): Promise<ILodge>;
  /** 숙소 수정 */
  edit(id: string, data: Partial<ILodge>): Promise<void>;
  /** 숙소 삭제 */
  delete(id: string): Promise<void>;
  /** 숙소 객실 추가 */
  addRoomType(id: string, room: IRoom, count: number): Promise<void>;
  /** 체크인 */
  checkIn(id: string, roomName: string): Promise<void>;
  /** 체크아웃 */
  checkOut(id: string, roomName: string): Promise<void>;
  /** roomId로 lodge 찾기 */
  findByRoomId(roomId: string): Promise<ILodge>;
  /** 검색어로 lodge 찾기 */
  findByKeyword(keywords: Array<string>): Promise<ILodge[]>;
}
