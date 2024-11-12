import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';

export interface CategroyService {
  getsCategory(): Promise<{ results: GetsCategoryResponseDTO }>;
  getCategory(id: string): Promise<GetsCategoryResponseDTO | null>;
  createCategory(params: Omit<ICategory, 'id'>): Promise<void>;
  updateCategory(id: string): Promise<void>;
  deleteCategroy(id: string): Promise<void>;
}
