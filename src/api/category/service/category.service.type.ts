import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';

export interface CategoryService {
  getsCategory(level: number, parent: string | null): Promise<{ results: GetsCategoryResponseDTO[] }>;
  getCategory(id: string): Promise<GetsCategoryResponseDTO | null>;
  createCategory(params: Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level' | 'parent'>): Promise<ICategory>;
  updateCategory(
    id: string,
    params: Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level' | 'parent'>,
  ): Promise<void>;
  addSubCategory(
    id: string,
    params: Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level' | 'parent'>,
  ): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
