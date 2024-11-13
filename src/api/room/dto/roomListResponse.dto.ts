import RoomResponseDto from './roomReponse.dto';

export default class RoomListResponseDto {
  index: number;
  content: Array<RoomResponseDto>;
  prev: string | null;
  next: string | null;
  maxCount: number;
  count: number;
  constructor(data: Array<IRoom>, index: number, prev: string | null, next: string | null) {
    this.index = index;
    this.content = data.map(room => new RoomResponseDto(room));
    this.prev = prev;
    this.next = next;
    this.maxCount = data.length;
    this.count = data.length;
  }
}
