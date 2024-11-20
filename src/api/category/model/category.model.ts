export class Category implements ICategory {
  id: string;
  path: string;
  title: string;
  thumbnail: string;
  subCategories: Category[];
  parent: string | null;
  level: number;
  lodges: ILodge[] | null;

  constructor(params: ICategory) {
    this.id = params.id;
    this.path = params.path;
    this.title = params.title;
    this.thumbnail = params.thumbnail;
    this.subCategories = params.subCategories;
    this.parent = params.parent;
    this.level = params.level;
    this.lodges = params.lodges;
  }
}
