
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../mocks/login';
import MainPage from './MainPage/MainPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import OfferPage from './OfferPage/OfferPage';
import FavouritePage from './FavouritePage/FavoritePage';
import LoginPage from './LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { review } from '../types/review';
import { useAppSelector } from '../hooks';
import LoadingScreen from './LoadingPage/LoadingPage';

function App({ guestReview } : { guestReview: review[]}): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offerlist = useAppSelector((state) => state.offerlist);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const offer = useAppSelector((state) => state.offer);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPage offerList={offerlist}/>}
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
          element = {<OfferPage offer = {offer} offerList={offerlist} guestReview={guestReview} city={city}/>}
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
