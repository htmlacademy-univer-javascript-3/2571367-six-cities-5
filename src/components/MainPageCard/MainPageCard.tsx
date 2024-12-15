import { OfferDescription } from '../../types/offerDescription.ts';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {MouseEvent} from 'react';
import { fetchComments, fetchOffer, fetchOfferNeibourhood } from '../../store/apiActions.ts';
import { store } from '../../store/index.ts';

type CardIdProps = {onAnswer: (cardId:string) => void}

type MainPageCardProps = {
  offer: OfferDescription;
  onListItemHover: (listItemName: string) => void;
  isMainPage:boolean;
} & CardIdProps;

function MainPageCard({ offer, onAnswer, onListItemHover, isMainPage}: MainPageCardProps): JSX.Element {
  const [cardId, setCardId] = useState('0');
  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setCardId(offer.id);
    onListItemHover((offer.id));
    onAnswer(cardId);
  };
  const handleListItemLeave = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setCardId('0');
    onListItemHover('0');

  };
  const handleOfferIdLoad = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    store.dispatch(fetchOffer(offer.id));
    store.dispatch(fetchOfferNeibourhood(offer.id));
    store.dispatch(fetchComments(offer.id));
  };
  return(
    <article className={isMainPage ? 'cities__card place-card' : 'near-places__card place-card'}
      onMouseEnter={handleListItemHover}
      onMouseLeave={handleListItemLeave}
    >
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>) : null}
      <div className={isMainPage ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">

        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.isFavorite === true ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{offer.isFavorite === true ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"
          onClick={handleOfferIdLoad}
        >
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>

  );
}
export default MainPageCard;
