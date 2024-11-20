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
  CATEGORY_API: '/api/category',
};

/** 예약 라우터 */
const RESERVATION_ROUTES = {
  ADMIN_RESERVATION_API: '/admin-api/reservation',
  RESERVATION_API: '/api/reservation',
};

const EVENT_ROUTES = {
  EVENT_API: '/api/event',
};

const PAYMENT_ROUTES = {
  PAYMENT_API: '/api/payment',
};

const AUTH_ROUTES = {
  AUTH_API: '/api/auth',
};

/** 최근 검색 라우터 */
const RECENT_SEARCH_ROUTES = {
  RECENT_SEARCH_API: `/api/recent-search`,
};

/** 인기 검색 라우터 */
const POPULAR_SEARCH_ROUTES = {
  POPULAR_SEARCH_API: `/api/popular-search`,
};
/** 쿠폰 */
const COUPON_ROUTES = {
  COUPON_API: '/api/coupon',
};

export const ROUTES_INDEX = {
  ...USER_ROUTES,
  ...LODGE_ROUTES,
  ...ROOM_ROUTES,
  ...CATEGORY_ROUTERS,
  ...RESERVATION_ROUTES,
  ...EVENT_ROUTES,
  ...PAYMENT_ROUTES,
  ...AUTH_ROUTES,
  ...RECENT_SEARCH_ROUTES,
  ...POPULAR_SEARCH_ROUTES,
  ...COUPON_ROUTES,
};
