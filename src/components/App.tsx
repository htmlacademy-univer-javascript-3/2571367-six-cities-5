
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../mocks/login.ts';
import { CITY } from '../mocks/city.ts';

import { review } from '../types/review.ts';

import { useAppSelector } from '../hooks/index.tsx';

import MainPage from './MainPage/MainPage.tsx';

import NotFoundPage from './NotFoundPage/NotFoundPage.tsx';
import OfferPage from './OfferPage/OfferPage.tsx';
import FavouritePage from './FavouritePage/FavoritePage.tsx';
import LoginPage from './LoginPage/LoginPage.tsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.tsx';

function App({ guestReview } : { guestReview: review[]}): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offerlist = useAppSelector((state) => state.offerlist);
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPage MapProps={offerlist}/>}
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
                offers = {offerlist}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {<OfferPage offer={offerlist} guestReview={guestReview} city={CITY.filter((o) => o.title === city)[0]}/>}
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
