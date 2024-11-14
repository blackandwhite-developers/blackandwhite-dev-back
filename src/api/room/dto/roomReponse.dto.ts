export default class RoomResponseDto {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: RoomCapacityDto;
  time: RoomTimeDto;
  price: RoomPriceDto;
  rating: number;
  review: string[];
  event: string;

  constructor(data: RoomResponseDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.capacity = new RoomCapacityDto(data.capacity);
    this.time = new RoomTimeDto(data.time);
    this.price = new RoomPriceDto(data.price);
    this.rating = data.rating;
    this.review = data.review;
    this.event = data.event;
  }
}

class RoomCapacityDto {
  standard: number;
  maximum: number;

  constructor(data: RoomCapacityDto) {
    this.standard = data.standard;
    this.maximum = data.maximum;
  }
}

class RoomTimeDto {
  checkIn: Date;
  checkOut: Date;

  constructor(data: RoomTimeDto) {
    this.checkIn = data.checkIn;
    this.checkOut = data.checkOut;
  }
}

class RoomPriceDto {
  price: number;
  discount: number;
  additionalPrice: number;

  constructor(data: RoomPriceDto) {
    this.price = data.price;
    this.discount = data.discount;
    this.additionalPrice = data.additionalPrice;
  }
}
