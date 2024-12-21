import { useMemo } from 'react';
import { OfferDescription, OfferIdDescription } from '../../types/offerDescription.ts';
import ReviewList from '../ReviewList/ReviewList.tsx';
import ReviewForm from '../ReviewForm/ReviewForm.tsx';
import OfferList from '../OfferList/OfferList.tsx';
import Map from '../Map/Map.tsx';
import { CITY } from '../../mocks/city.ts';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { CommentList } from '../../types/comment.ts';
import { AppRoute, AuthorizationStatus } from '../../mocks/login.ts';
import { getAuthorizationStatus, getComments, getOffersNearby, getUserEmail } from '../../store/selectors.ts';
import { store } from '../../store/index.ts';
import { fetchComments, fetchOffer, fetchOfferNeibourhood, setFavourites } from '../../store/apiActions.ts';
import { Link, useParams } from 'react-router-dom';
import { emptyOffer } from '../../mocks/offer.ts';
import NotFoundPage from '../NotFoundPage/NotFoundPage.tsx';

function OfferPage({ offer, offerList, city}: {offer:OfferIdDescription ; offerList:OfferDescription[]; city:string}):JSX.Element{
  const authStatus = useAppSelector(getAuthorizationStatus);
  const authStatusMemo = useMemo(() => authStatus,[authStatus]);

  const userEmail = useAppSelector(getUserEmail);
  const userEmailMemo = useMemo(() => userEmail,[userEmail]);

  const nearOffers = useAppSelector(getOffersNearby);
  const nearbyOffers = useMemo(() => nearOffers, [nearOffers]);

  const commentList:CommentList = useAppSelector(getComments);
  const comments = useMemo(()=> commentList,[commentList]);
  const { id } = useParams<{ id: string }>();
  const isIdExist = offerList.filter((o) => o.id === id).length > 0;
  if (isIdExist && offer === emptyOffer && id){
    store.dispatch(fetchOffer(id));
    store.dispatch(fetchComments(id));
    store.dispatch(fetchOfferNeibourhood(id));
  }

  const handleFavouriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const favouriteInfo = {
      offerId:offer.id,
      status: offer.isFavorite ? 0 : 1,
      isOfferPage: true
    };
    store.dispatch(setFavourites(favouriteInfo));
  };

  return isIdExist ? (

    <div className="page">
      <UserHeaderInfo authStatus={authStatusMemo} userEmail={userEmailMemo}/>

      <main className="page__main page__main--offer">
        <section className="offer" data-testid = "offer-info">
          <div className="offer__gallery-container container" data-testid = "offer-gallery">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Фото студии" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                {authStatus === AuthorizationStatus.Auth ?
                  <button className={offer.isFavorite ? 'offer__bookmark-button offer__bookmark-button--active button' : 'offer__bookmark-button button'} type="button" onClick={handleFavouriteClick}>
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{offer.isFavorite ? 'In bookmark' : 'To bookmark'}</span>
                  </button> :
                  <button className={'offer__bookmark-button button'} type="button">
                    <Link to = {AppRoute.Login}>
                      <svg className="offer__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                    </Link>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>}
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--entire">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--entire">
                  Max {offer.maxAdults} Adults
                </li>
                )

              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((ins) => (
                    <li key={ins} className="offer__inside-item">
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host" data-testid = "host-info">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {offer.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>

                </div>
              </div>
              <section className="offer__reviews reviews" data-testid = "reviews">
                <ReviewList guestReview = {[...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}/>
                {authStatus === AuthorizationStatus.Auth ? <ReviewForm/> : null}
              </section>

            </div>
          </div>
          <section className="offer__map map" data-testid = "map">
            <Map
              city={CITY.filter((c) => c.title === city)[0]}
              selectedOffer={offerList.filter((i) => i.id === offer?.id)[0] }
              height={579}
              width={1144}
              offerList={nearOffers.slice(0,3).concat(offerList.filter((i) => i.id === offer.id))}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places" data-testid = "nearby-places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offer={nearbyOffers.slice(0,3)} onListItemHover={()=>{}} isMainPage = {false} city={city}/>
          </section>
        </div>
      </main>
    </div>) : (<NotFoundPage userEmail={userEmail} authStatus={authStatus}/>);
}
export default (OfferPage);
