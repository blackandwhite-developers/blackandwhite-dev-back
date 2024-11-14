export default interface PaymentRepository {
  /** 결제 생성 */
  save(payment: Omit<IPayment, 'id'>): Promise<IPayment>;
  /** 결제 목록 조회 */
  findAll(): Promise<IPayment[]>;
  /** ID로 결제 조회 */
  findById(id: string): Promise<IPayment | null>;
  /** 결제 수정 */
  update(id: string, updatePaymentInfo: Partial<IPayment>): Promise<IPayment>;
  /** 결제 삭제 */
  delete(id: string): Promise<void>;
  /** 결제 취소 */
  cancel(id: string): Promise<IPayment>;
}
