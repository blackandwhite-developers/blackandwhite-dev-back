import { CategoryRepository } from '../repository/category.repository';

import { CategoryService } from './category.service.type';

import { GetsCategoryResponseDTO } from '../dto/getCategoryResponse.dto';
import HttpException from '@/api/common/exceptions/http.exception';

export class CategoryServiceImpl implements CategoryService {
  constructor(private readonly _categoryRepository: CategoryRepository) {}

  async getsCategory(): Promise<{ results: GetsCategoryResponseDTO[] }> {
    const categories = await this._categoryRepository.getsCategory();
    return { results: categories.map(cate => new GetsCategoryResponseDTO(cate)) };
  }

  async getCategory(id: string): Promise<GetsCategoryResponseDTO | null> {
    const category = await this._categoryRepository.getCategory(id);

    if (!category) throw new HttpException(404, '해당 카테고리를 찾을 수 없습니다');

    const categoryDto = new GetsCategoryResponseDTO(category);

    return categoryDto;
  }

  async createCategory(params: Omit<ICategory, 'id'>): Promise<ICategory> {
    if (!params) throw new HttpException(400, '해당 요청을 처리 할 수 없습니다.');
    const category = await this._categoryRepository.createCategory(params);
    return category;
  }

  async updateCategory(id: string, params: Omit<ICategory, 'id'>): Promise<void> {
    const findCate = await this._categoryRepository.getCategory(id);
    if (!findCate) throw new HttpException(404, '카테고리를 찾을 수 없습니다.');

    await this._categoryRepository.updateCategory(id, params);
    return;
  }

  async deleteCategory(id: string): Promise<void> {
    const findCate = await this._categoryRepository.getCategory(id);
    if (!findCate) throw new HttpException(404, '카테고리를 찾을 수 없습니다.');
    await this._categoryRepository.deleteCategory(id);
  }
}
