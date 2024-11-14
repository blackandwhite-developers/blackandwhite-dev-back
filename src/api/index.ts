/** 사용자 라우터 */
const USER_ROUTES = {
  /** 유저 관리자 API */
  ADMIN_USERS_API: '/admin-api/users',
  /** 유저 API */
  USERS_API: '/api/users',
};

const LODGE_ROUTES = {
  ADMIN_LODGES_API: '/admin-api/lodges',
  LODGES_API: '/api/lodges',
};

const ROOM_ROUTES = {
  ADMIN_ROOMS_API: '/admin-api/rooms',
  ROOMS_API: '/api/rooms',
};

/** 카테고리 라우터 */
const CATEGORY_ROUTERS = {
  CATEGORY_API: 'api/category',
};

/** 예약 라우터 */
const RESERVATION_ROUTES = {
  /** 예약 API */
  RESERVATION_API: "/api/reservations",
}

export const ROUTES_INDEX = {
  ...USER_ROUTES,
  ...LODGE_ROUTES,
  ...ROOM_ROUTES,
  ...CATEGORY_ROUTERS,
  ...RESERVATION_ROUTES,
};
