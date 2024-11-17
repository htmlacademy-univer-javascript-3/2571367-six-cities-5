
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../mocks/login.ts';
import MainPage from './MainPage/MainPage.tsx';
import {mainPageTypes} from '../index.tsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.tsx';
import OfferPage from './OfferPage/OfferPage.tsx';
import FavouritePage from './FavouritePage/FavoritePage.tsx';
import LoginPage from './LoginPage/LoginPage.tsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.tsx';
import { OfferDescription } from '../types/offerDescription.ts';
import { review } from '../types/review.ts';
import {POINTS} from '../mocks/points.ts';
import {CITY} from '../mocks/city.ts';
import { MapProps } from './MainPage/MainPage.tsx';

const MAPPROPS:MapProps = {
  city:CITY,
  points:POINTS
};
function App({ MainPageCardProps, guestReview, offer } : { MainPageCardProps: mainPageTypes; guestReview: review[]; offer: OfferDescription[] }): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPage MainPageCardProps={MainPageCardProps} offer={offer} MapProps={MAPPROPS}/>}
        />
        <Route
          path = {AppRoute.Login}
          element = {<LoginPage/>}
        />
        <Route
          path = {AppRoute.Favourites}
          element = {
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavouritePage
                offers = {offer}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {<OfferPage offer={offer} guestReview={guestReview}/>}
        />
        <Route
          path = '*'
          element = {<NotFoundPage/>}
        />

      </Routes>
    </BrowserRouter>
  );

}
export default App;
