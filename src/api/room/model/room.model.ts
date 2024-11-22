export default class Room implements IRoom {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: IRoomCapacity;
  time: IRoomTime;
  price: IPrice;
  event: string;
  lodgeId: string;

  constructor(data: IRoom) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.capacity = data.capacity;
    this.time = data.time;
    this.price = data.price;
    this.event = data.event;
    this.lodgeId = data.lodgeId;
  }
}
