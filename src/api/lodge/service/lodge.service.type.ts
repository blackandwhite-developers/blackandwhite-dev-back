import LodgeResponseDto from '../dto/lodgeResponse.dto';

export default interface LodgeService {
  /** 숙소 조회 (카테고리별) */
  getLodgesByCategory(categoryId: string): Promise<ILodge[]>;
  /** 숙소 상세 조회 */
  getLodge(id: string): Promise<LodgeResponseDto>;
  /** 숙소 등록 */
  postLodge(data: ILodge, categoryId: string): Promise<LodgeResponseDto>;
  /** 숙소 수정 */
  putLodge(id: string, data: ILodge): Promise<void>;
  /** 숙소 삭제 */
  deleteLodge(id: string): Promise<void>;
}