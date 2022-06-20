const TOTAL_CARD_COUNT = 17;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_IN_EXTRA = 2;

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const FilterName = {
  [FilterType.ALL]: 'All movies',
  [FilterType.WATCHLIST]: 'Watchlist',
  [FilterType.HISTORY]: 'History',
  [FilterType.FAVORITES]: 'Favorites'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const RequestMethod  = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST'
};

const TimeLimit = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000,
};

export { TOTAL_CARD_COUNT, CARD_COUNT_PER_STEP, CARD_COUNT_IN_EXTRA, FilterType, FilterName, Mode, SortType, UserAction, UpdateType, RequestMethod, TimeLimit };
