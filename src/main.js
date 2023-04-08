import { render} from './framework/render.js';
import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CardsModel from './model/cards-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filters-model.js';
import CardsApiService from './services/cards-api-service.js';
import CommentsApiService from './services/comments-api-service.js';
// import HackModel from './model/hack-model';

const AUTORIZATION = 'Basic 68jfdgisjw9508jdkgkl';
// const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict/';
const END_POINT = 'http://localhost:4005';

const headerElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const cardsModel = new CardsModel(new CardsApiService(END_POINT, AUTORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTORIZATION));
// const hackModel = new HackModel(new CardsApiService(END_POINT, AUTORIZATION), new CommentsApiService(END_POINT, AUTORIZATION));
// hackModel.getData();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteMainElement, cardsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, cardsModel);

render(new UserProfileView(), headerElement);
render(new FooterStatisticsView(), footerElement);

filterPresenter.init();
boardPresenter.init();
cardsModel.init();
