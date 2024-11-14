import { CategorRepository } from '../repository/category.repository';

import { CategoryService } from './category.service.type';

import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';
import HttpException from '@/api/exceptions/http.exception';

export class CategoryServiceImpl implements CategoryService {
  constructor(private readonly _mongooseCategortRespository: CategorRepository) {}

  async getsCategory(): Promise<{ results: GetsCategoryResponseDTO[] }> {
    const categories = await this._mongooseCategortRespository.getsCategory();
    return { results: categories.map(cate => new GetsCategoryResponseDTO(cate)) };
  }

  async getCategory(id: string): Promise<GetsCategoryResponseDTO | null> {
    const category = await this._mongooseCategortRespository.getCategory(id);

    if (!category) throw new HttpException(404, '해당 카테고리를 찾을 수 없습니다');

    const categoryDto = new GetsCategoryResponseDTO(category);

    return categoryDto;
  }

  async createCategory(params: Omit<ICategory, 'id'>): Promise<void> {
    if (!params) throw new HttpException(400, '해당 요청을 처리 할 수 없습니다.');
    await this._mongooseCategortRespository.createCategory(params);
    return;
  }

  async updateCategory(id: string, params: Omit<ICategory, 'id'>): Promise<void> {
    const findCate = await this._mongooseCategortRespository.getCategory(id);
    if (!findCate) throw new HttpException(404, '카테고리를 찾을 수 없습니다.');

    await this._mongooseCategortRespository.updateCategory(id, params);
    return;
  }

  async deleteCategroy(id: string): Promise<void> {
    const findCate = await this._mongooseCategortRespository.getCategory(id);
    if (!findCate) throw new HttpException(404, '카테고리를 찾을 수 없습니다.');
    await this._mongooseCategortRespository.deleteCategory(id);
  }
}
