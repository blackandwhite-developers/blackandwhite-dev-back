export class Category implements ICategory {
  id: string;
  title: string;
  thumbnail: string;
  division: string;

  constructor(params: ICategory) {
    this.id = params.id;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.division = params.division;
  }
}
