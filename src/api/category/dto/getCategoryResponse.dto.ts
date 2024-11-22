export class GetsCategoryResponseDTO {
  id?: string;
  title: string;
  thumbnail: string;
  path: string;

  constructor(params: ICategory) {
    this.id = params.id;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.path = params.path;
  }
}
