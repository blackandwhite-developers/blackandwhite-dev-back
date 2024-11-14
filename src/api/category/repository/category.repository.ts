export interface CategoryRepository {
  createCategory(params: Omit<ICategory, 'id'>): Promise<void>;
  getsCategory(): Promise<ICategory[]>;
  getCategory(id: string): Promise<ICategory | null>;
  updateCategory(id: string, updateInfo: Partial<ICategory>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
