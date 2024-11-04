const USER_ROUTES = {
  USER_API: '/api/user',
  ADMIN_USER_API: '/admin-api/user',
} as const;

const PROVINCE_ROUTES = {
  PROVINCE_API: '/api/province',
  ADMIN_PROVINCE_API: '/admin-api/province',
} as const;

const POST_ROUTES = {
  POST_API: '/api/post',
  ADMIN_POST_API: '/admin-api/post',
} as const;

const COMMENT_ROUTES = {
  COMMENT_API: '/api/comment',
  ADMIN_COMMENT_API: '/admin-api/comment',
};

const CATEGORY_ROUTES = {
  CATEGORY_API: '/api/category',
  ADMIN_CATEGORY_API: '/admin-api/category',
};

export const ROUTES_INDEX = {
  ...USER_ROUTES,
  ...PROVINCE_ROUTES,
  ...POST_ROUTES,
  ...COMMENT_ROUTES,
  ...CATEGORY_ROUTES,
};
