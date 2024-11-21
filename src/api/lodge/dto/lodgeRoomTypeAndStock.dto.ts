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
      checkIn: string;
      checkOut: string;
    };
    price: {
      price: number;
      discount: number;
      additionalPrice: number;
    };
    event: string;
    lodgeId: string;
  }>;
  stock: number;
  constructor(data: IRoomTypeAndStock) {
    this.roomType = data.roomType;
    this.stock = data.stock;
  }
}
