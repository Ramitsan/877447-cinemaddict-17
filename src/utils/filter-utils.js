import { FilterType } from '../const.js';

export const filter = {
  [FilterType.ALL]:(cards) => cards,
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.isWatchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.isAlreadyWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.isFavorite),
};
