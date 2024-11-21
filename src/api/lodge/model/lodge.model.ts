export default class Lodge implements ILodge {
  id: string;
  name: string;
  address: string;
  addressDetail: string;
  lat: number;
  lng: number;
  phone: string;
  description: string;
  image: string;
  room: IRoomTypeAndStock[];
  categoryId: string;
  subCategoryId: string;
  rating: number;
  review: string[]; // TODO: 리뷰 모델 추가
  price: string;

  constructor(data: ILodge) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.addressDetail = data.addressDetail;
    this.lat = data.lat;
    this.lng = data.lng;
    this.phone = data.phone;
    this.description = data.description;
    this.image = data.image;
    this.room = data.room;
    this.categoryId = data.categoryId;
    this.subCategoryId = data.subCategoryId;
    this.rating = data.rating;
    this.review = data.review;
    this.price = data.price;
  }
}
