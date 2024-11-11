interface ILodge {
  id: string;
  /** 숙소 이름 */
  name: string;
  /** 숙소 주소 */
  address: string;
  /** 숙소 상세 주소 */
  addressDetail: string;
  /**위도 */
  lat: number;
  /**경도 */
  lng: number;
  /** 숙소 전화번호 */
  phone: string;
  /** 숙소 소개 */
  description: string;
  /** 숙소 이미지 */
  image: string;
  /** 숙소 객실 종류 및 재고 */
  room: Array<IRoomTypeAndStock>;
}

interface IRoomTypeAndStock {
  roomType: Array<IRoom>;
  stock: number;
}
