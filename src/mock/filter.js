import { filter } from '../utils/filter-utils.js';

export const generateFilter = (cards) => Object.entries(filter).map(([filterName, filterCards]) => ({
  name: filterName,
  count: filterCards(cards).length,
}),
);
