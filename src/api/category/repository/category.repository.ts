export interface CategoryRepository {
  createCategory(params: Omit<ICategory, 'id' | 'subCategories' | 'lodges'>): Promise<ICategory>;
  getsCategory(level: number, parent: string | null): Promise<ICategory[]>;
  getCategory(id: string): Promise<ICategory | null>;
  updateCategory(id: string, updateInfo: Partial<ICategory>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  addLodge(id: string, params: ILodge): Promise<void>;
  addSubCategory(id: string, params: Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level'>): Promise<void>;
}
