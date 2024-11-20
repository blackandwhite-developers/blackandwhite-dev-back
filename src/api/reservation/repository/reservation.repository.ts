export interface ReservationRepository {
  /** 예약 생성 */
  save(user: Omit<IReservation, 'id'>): Promise<IReservation>;
  /** 예약 목록 조회 */
  findAll(): Promise<IReservation[]>;
  /** ID로 예약 조회 */
  findById(id: string): Promise<IReservation | null>;

  findByUserId(userId: string): Promise<IReservation[]>;
  /** 예약 수정 */
  update(id: string, updateReservationInfo: Partial<IReservation>): Promise<IReservation>;
  /** 예약 삭제 */
  delete(id: string): Promise<void>;
  /** 예약 취소 */
  cancel(id: string): Promise<IReservation>;
}
