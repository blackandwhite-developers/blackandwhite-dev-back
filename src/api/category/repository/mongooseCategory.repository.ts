import { CategorRepository } from '../repository/category.repository';
import { mongooseCategory } from '../model/category.schema';

export class MongooseCategoryRepository implements CategorRepository {
  async createCategory(params: Omit<ICategory, 'id'>): Promise<void> {
    const newCategroy = new mongooseCategory({ params });
    await newCategroy.save();
  }
  async getsCategory(): Promise<ICategory[]> {
    const results = await mongooseCategory.find();
    return results;
  }
  async getCategory(id: string): Promise<ICategory | null> {
    const result = await mongooseCategory.findById(id);
    if (result) {
      throw new Error('해당 카테고리를 찾을 수 없습니다.');
    }
    return result;
  }
  async updateCategory(id: string, updateInfo: Partial<ICategory>): Promise<void> {
    const result = await mongooseCategory.findById(id);
    if (result) {
      await mongooseCategory.findByIdAndUpdate(id, {
        ...updateInfo,
      });
      return;
    }
    throw new Error('카테고리 업데이트 실패!');
  }
  async deleteCategory(id: string): Promise<void> {
    const result = await mongooseCategory.findById(id);
    if (result) {
      await mongooseCategory.findByIdAndDelete(id);
      return;
    }
    throw new Error('카테고리 삭제 실패!');
  }
}
