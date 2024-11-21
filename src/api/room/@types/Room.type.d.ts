interface IRoom {
  id: string;
  /** 객실 이름 */
  name: string;
  /** 객실 설명 */
  description: string;
  /** 객실 이미지 */
  image: string;
  /** 객실 인원 */
  capacity: IRoomCapacity;
  /** 객실 시설 */
  time: IRoomTime;
  /** 객실 가격 */
  price: IPrice;
  /** 이벤트 */
  event: string;
  /** 숙소 ID */
  lodgeId: string;
}

type IPartialRoom = Pick<IRoom, 'id' | 'name' | 'image' | 'capacity' | 'time' | 'price'>

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
  checkIn: string;
  /** 퇴실 시간 */
  checkOut: string;
}

interface IRoomCapacity {
  /** 기준 인원 */
  standard: number;
  /** 최대 인원 */
  maximum: number;
}
