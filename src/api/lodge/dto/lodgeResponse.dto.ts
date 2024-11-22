import LodgeRoomTypeAndStockDto from './lodgeRoomTypeAndStock.dto';
import { GetsCategoryResponseDTO } from '@/api/category/dto/getCategoryResponse.dto';

export default class LodgeResponseDto {
  id: string;
  category: GetsCategoryResponseDTO;
  name: string;
  address: string;
  addressDetail: string;
  lat: number;
  lng: number;
  phone: string;
  description: string;
  image: string;
  room: Array<LodgeRoomTypeAndStockDto>;
  rating: number;
  review: string[];
  price: number;
  distance: string;
  count: number;

  constructor(data: ILodge) {
    this.id = data.id;
    this.name = data.name;
    this.category = new GetsCategoryResponseDTO(data.category);
    this.address = data.address;
    this.addressDetail = data.addressDetail;
    this.lat = data.lat;
    this.lng = data.lng;
    this.phone = data.phone;
    this.description = data.description;
    this.image = data.image;
    this.room = data.room.map(room => new LodgeRoomTypeAndStockDto(room));
    this.rating = data.rating;
    this.review = data.review;
    this.price = data.price;
    this.distance = data.distance;
    this.count = data.count;
  }
}
