const USER_ROUTES = {
  USER_API: '/api/user',
  ADMIN_USER_API: '/admin-api/user',
} as const;

const CATEGORY_ROUTES = {
  CATEGORY_API: '/api/category',
  ADMIN_CATEGORY_API: '/admin-api/category',
};

export const ROUTES_INDEX = {
  ...USER_ROUTES,
  ...CATEGORY_ROUTES,
};
