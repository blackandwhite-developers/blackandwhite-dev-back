interface ICategory {
  id: string;
  path: string;
  title: string;
  thumbnail: string;
  subCategories: ICategory[];
  parent: string | null;
  level: number;
  lodges: ILodge[] | null;
}
