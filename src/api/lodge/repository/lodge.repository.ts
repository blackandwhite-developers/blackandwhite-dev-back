export default interface LodgeRepository {
  /** 숙소 조회 */
  findById(id: string): Promise<ILodge>;
  /** 숙소 등록 */
  save(data: ILodge): Promise<ILodge>;
  /** 숙소 수정 */
  edit(id: string, data: ILodge): Promise<void>;
  /** 숙소 삭제 */
  delete(id: string): Promise<void>;
}
