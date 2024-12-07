

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { CityOfferDescription, OfferDescription } from '../../types/offerDescription.ts';
import { review } from '../../types/review.ts';
import { City, Point } from '../../types/points.ts';

import ReviewForm from '../../components/ReviewForm/ReviewForm.tsx';
import OfferList from '../../components/OfferList/OfferList.tsx';

import Map from '../Map/Map.tsx';
import ReviewList from '../ReviewList/ReviewList.tsx';

function OfferPage({ offer, guestReview, city}: {offer:CityOfferDescription;guestReview:review[];city:City}):JSX.Element{
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const { id } = useParams<{ id: string }>();
  const filteredOffer:OfferDescription[] = offer.offer.filter((of) =>(of.id === id));
  const handleListItemHover = (listItemId: string) => {
    const currentPoint = offer.offer.find((o) => o.id.toString() === listItemId)?.point;
    setSelectedPoint(currentPoint);
  };
  return (

    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <Link to = "/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {filteredOffer[0].images.map((image) => (
                <div key={image} className="offer__image-wrapper"> {}
                  <img className="offer__image" src={image} alt="Фото студии"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {filteredOffer[0].isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {filteredOffer[0].offerName}
                </h1>
                <button className={filteredOffer[0].bookmark === 'In bookmarks' ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button'} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{filteredOffer[0].bookmark}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: filteredOffer[0].raitingStars}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{filteredOffer[0].raiting}</span>
              </div>
              <ul className="offer__features">
                {filteredOffer[0].features.map((feature) => (
                  <li key={feature} className="offer__feature offer__feature--entire">
                    {feature}
                  </li>
                ))}

              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{filteredOffer[0].price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {filteredOffer[0].inside.map((ins) => (
                    <li key={ins} className="offer__inside-item">
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={filteredOffer[0].hostAvatar} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {filteredOffer[0].hostName}
                  </span>
                  <span className="offer__user-status">
                    {filteredOffer[0].hostStatus}
                  </span>
                </div>
                <div className="offer__description">
                  {filteredOffer[0].description.map((desc) => (
                    <p key={desc} className="offer__text">
                      {desc}
                    </p>
                  ))}


                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList guestReview = {guestReview}/>
                <ReviewForm
                  onAnswer={() => {
                    throw new Error('Function \'onAnswer\' isn\'t implemented.');
                  }}
                />
              </section>

            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={city}
              selectedPoint={selectedPoint}
              height={579}
              width={1144}
              offer={offer.offer.filter((o) => o.id !== filteredOffer[0].id)}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offer={offer.offer.filter((of) =>(of.id !== id))} onListItemHover={handleListItemHover} isMainPage = {false} />
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
