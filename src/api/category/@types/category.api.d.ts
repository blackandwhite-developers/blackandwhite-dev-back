// 카테고리 조회
type getsCategoryRequestParams = {
  level: number;
  parent: string | null;
};
type getsCategoryRequestPath = {};
type getsCategoryRequestBody = {};

type getsCategoryRequest = {
  params: getsCategoryRequestParams;
  path?: getsCategoryRequestPath;
  body?: getsCategoryRequestBody;
};

type getsCategoryResponse = Array<Omit<ICategory, 'id'>>;

// 카테고리 상세조회
type getCategoryRequestParams = {};
type getCategoryRequestPath = {
  cid: string;
};
type getCategoryRequestBody = {};

type getCategoryRequest = {
  params: getCategoryRequestParams;
  path: getCategoryRequestPath;
  body: getCategoryRquestBody;
};

type getCategoryResponse = ICategory | null;

// 카테고리 생성
type createCategoryRequestParams = {};
type createCategoryRequestPath = {};
type createCategoryRequestBody = Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level'>;

type createCategoryRequest = {
  params: createCategoryRequestParams;
  path: createCategoryRequestPath;
  body: createCategoryRequestBody;
};
type createCategoryResponse = ICategory;

// 카테고리 업데이트
type updateCategoryRequestParams = {};
type updateCategoryRequestPath = {
  cid: string;
};
type updateCategoryRequestBody = Partial<Omit<ICategory, 'id' | 'subCategories' | 'lodges' | 'level'>>;
type updateCategoryRequest = {
  params: updateCategoryRequestParams;
  path: updateCategoryRequestPath;
  body: Partial<updateCategoryRequestBody>;
};

type updateCategoryResponse = ICategory;

// 카테고리 삭제

type deleteCategoryRequestParams = {};
type deleteCategoryRequestPath = {
  cid: string;
};
type deleteCategoryRequestBody = {};
type deleteCategoryRequest = {
  params: deleteCategoryRequestParams;
  path: deleteCategoryRequestPath;
  body: deleteCategoryRequestBody;
};

type deleteCategoryResponse = void;
