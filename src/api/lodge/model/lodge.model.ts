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
  }
}
