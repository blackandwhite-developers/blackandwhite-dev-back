export default class LodgeRoomTypeAndStockDto {
  roomType: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    capacity: {
      standard: number;
      maximum: number;
    };
    time: {
      checkIn: Date;
      checkOut: Date;
    };
    price: {
      price: number;
      discount: number;
      additionalPrice: number;
    };
    rating: number;
    review: string[];
    event: string;
  }>;
  stock: number;
  constructor(data: IRoomTypeAndStock) {
    this.roomType = data.roomType;
    this.stock = data.stock;
  }
}