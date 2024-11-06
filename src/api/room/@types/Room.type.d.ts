interface IRoom {
  id: string;
  /** 객실 타입 */
  type: string; // TODO: 객실 타입을 enum으로 변경
  /** 객실 인원 */
  capacity: IRoomCapacity;
  /** 객실 시설 */
  time: IRoomTime;
  /** 객실 가격 */
  price: IPrice;
  /** 상태 */
  status: 'cleaning' | 'reserved' | 'empty'; // 청소중, 예약중, 빈방
}

interface IPrice {
  /** 가격 */
  price: number;
  /** 할인율 */
  discount: number;
  /** 인원 당 추가 가격 */
  additionalPrice: number;
}

interface IRoomTime {
  /** 입실 시간 */
  checkIn: Date;
  /** 퇴실 시간 */
  checkOut: Date;
}

interface IRoomCapacity {
  /** 성인 */
  adult: number;
  /** 어린이 */
  child: number;
}
