interface ILodge {
  id: string;
  /** 숙소 이름 */
  name: string;
  /** 숙소 주소 */
  address: string;
  /** 숙소 전화번호 */
  phone: string;
  /** 숙소 소개 */
  description: string;
  /** 숙소 이미지 */
  image: string;
  /** 숙소 객실 목록 */
  rooms: Array<IRoom>;
}
