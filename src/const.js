const TOTAL_CARD_COUNT = 23;
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

export { TOTAL_CARD_COUNT, CARD_COUNT_PER_STEP, CARD_COUNT_IN_EXTRA, FilterType, FilterName, Mode, SortType };
