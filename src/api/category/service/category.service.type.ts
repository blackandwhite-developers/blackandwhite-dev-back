import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';

export interface CategoryService {
  getsCategory(): Promise<{ results: GetsCategoryResponseDTO[] }>;
  getCategory(id: string): Promise<GetsCategoryResponseDTO | null>;
  createCategory(params: Omit<ICategory, 'id'>): Promise<void>;
  updateCategory(id: string, params: Omit<ICategory, 'id'>): Promise<void>;
  deleteCategroy(id: string): Promise<void>;
}
