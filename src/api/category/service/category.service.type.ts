import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';

export interface CategoryService {
  getsCategory(): Promise<{ results: GetsCategoryResponseDTO[] }>;
  getCategory(id: string): Promise<GetsCategoryResponseDTO | null>;
  createCategory(params: Omit<ICategory, 'id'>): Promise<ICategory>;
  updateCategory(id: string, params: Omit<ICategory, 'id'>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
