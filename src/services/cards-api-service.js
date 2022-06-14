import ApiService from '../framework/api-service';
import { RequestMethod } from '../const.js';

export default class CardsApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateCard = async(card) => {
    const response = await this._load({
      url: `movies/${card.id}`,
      method: RequestMethod.PUT,
      body: JSON.stringify(this.#adaptToServer(card)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (card) => {
    const adaptedCard = {...card,
      'film_info': card.filmInfo,
      'alternative_title': card.filmInfo.alternativeTitle,
      'age_rating': card.filmInfo.ageRating,
      'total_rating': card.filmInfo.totalRating,
      'release_country': card.filmInfo.release.releaseCountry,
      'user_details': card.userDetails,
      'watchlist': card.userDetails.isWatchlist,
      'already_watched': card.userDetails.isAlreadyWatched,
      'watching_date': card.userDetails.watchingDate instanceof Date ? card.userDetails.watchingDate.toISOString() : null,
      'favorite': card.userDetails.isFavorite,
    };

    // Ненужные ключи мы удаляем
    delete adaptedCard.filmInfo;
    delete adaptedCard.filmInfo.alternativeTitle;
    delete adaptedCard.filmInfo.ageRating;
    delete adaptedCard.filmInfo.totalRating;
    delete adaptedCard.filmInfo.release.releaseCountry;
    delete adaptedCard.userDetails;
    delete adaptedCard.userDetails.isWatchlist;
    delete adaptedCard.userDetails.isAlreadyWatched;
    delete adaptedCard.userDetails.watchingDate;
    delete adaptedCard.userDetails.isFavorite;

    return adaptedCard;
  };
}
