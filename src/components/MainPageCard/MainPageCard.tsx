import { OfferDescription } from '../../types/offerDescription.ts';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {MouseEvent} from 'react';

type CardIdProps = {onAnswer: (cardId:string) => void}

type MainPageCardProps = {
  offer: OfferDescription;
  onListItemHover: (listItemName: string) => void;
} & CardIdProps;

function MainPageCard({ offer, onAnswer, onListItemHover}: MainPageCardProps): JSX.Element {
  const [cardId, setCardId] = useState('0');
  const handleListItemHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setCardId(offer.id);
    onListItemHover((offer.id));
    onAnswer(cardId);
  };
  return(
    <article className="cities__card place-card"
      onMouseEnter={handleListItemHover}
    >
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.images[0]} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">

        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.bookmark === 'In bookmarks' ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{offer.bookmark}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: offer.raitingStars}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.offerName}</Link>
        </h2>
        <p className="place-card__type">{offer.features[0]}</p>
      </div>
    </article>

  );
}
export default MainPageCard;
