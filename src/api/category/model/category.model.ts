export class Category implements ICategory {
  id: string;
  path: string;
  title: string;
  thumbnail: string;
  subCategories: ICategory[];
  parent: string | null;
  level: number;
  lodges: ILodge[] | null;
  division: ICategory[]; 

  constructor(params: ICategory) {
    this.id = params.id;
    this.path = params.path;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.subCategories = params.subCategories;
    this.division = params.division;
    this.parent = params.parent;
    this.level = params.level;
    this.lodges = params.lodges;
  }
}
