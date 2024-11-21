import { CategoryRepository } from '../repository/category.repository';
import { mongooseCategory } from '../model/category.schema';

export class MongooseCategoryRepository implements CategoryRepository {
  async createCategory(params: Omit<ICategory, 'id' | 'subCategory'>): Promise<ICategory> {
    const newCategory = new mongooseCategory(params);
    newCategory.subCategories = [];
    const category = await newCategory.save();
    return category;
  }
  async getsCategory(level: number, parent: string | null): Promise<ICategory[]> {
    const results = await mongooseCategory
      .find({
        level,
        parent,
      })
      .populate('subCategories')
      .populate('lodges');
    return results;
  }
  async getCategory(id: string): Promise<ICategory | null> {
    const result = await mongooseCategory.findById(id).populate('subCategories').populate('lodges');
    if (!result) {
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
  async addLodge(id: string, params: ILodge): Promise<void> {
    const category = await mongooseCategory.findById(id);
    if (!category) {
      throw new Error('카테고리를 찾을 수 없습니다.');
    }
    if (category.lodges) {
      category.lodges.push(params);
    } else {
      category.lodges = [params];
    }
    await category.save();
  }
  async addSubCategory(id: string, params: Omit<ICategory, 'id' | 'subCategory' | 'level'>): Promise<void> {
    const category = await mongooseCategory.findById(id);
    if (!category) {
      throw new Error('카테고리를 찾을 수 없습니다.');
    }
    const newCategory = new mongooseCategory(params);
    newCategory.level = category.level + 1;
    newCategory.subCategories = [];
    newCategory.parent = category.id;
    await newCategory.save();
    category.subCategories.push(newCategory);
    await category.save();
  }
}
