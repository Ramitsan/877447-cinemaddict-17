const TOTAL_CARD_COUNT = 4;
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
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { TOTAL_CARD_COUNT, CARD_COUNT_PER_STEP, CARD_COUNT_IN_EXTRA, FilterType, FilterName, Mode, SortType, UserAction, UpdateType };
