
import { OfferDescription } from '../../types/offerDescription';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo';
import { AuthorizationStatus } from '../../mocks/login';
import FavouriteList from '../FavoriteList/FavoriteList';

interface FavouritePageProps {
  offers: OfferDescription[];
  authStatus: AuthorizationStatus;
  userEmail: string;
}

function FavouritePage({ offers, authStatus, userEmail }: FavouritePageProps): JSX.Element {
  const cityList:string[] = [];
  offers.forEach((offer) => {
    if (!cityList.includes(offer.city.name)){
      cityList.push(offer.city.name);
    }
  });
  return (
    <div className="page">
      <UserHeaderInfo authStatus = {authStatus} userEmail = {userEmail}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavouriteList offers = {offers} cityList = {cityList}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>

  );
}

export default FavouritePage;
