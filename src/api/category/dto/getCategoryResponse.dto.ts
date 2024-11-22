export class GetsCategoryResponseDTO {
  id?: string;
  title: string;
  thumbnail: string;

  constructor(params: ICategory) {
    this.id = params.id;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
  }
}
