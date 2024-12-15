
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../mocks/login';
import MainPage from './MainPage/MainPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import OfferPage from './OfferPage/OfferPage';
import FavouritePage from './FavouritePage/FavoritePage';
import LoginPage from './LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { useAppSelector } from '../hooks';
import LoadingScreen from './LoadingPage/LoadingPage';
import HistoryRouter from './HistoryRouter/HistoryRouter.tsx';
import browserHistory from '../services/browserHistory.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const city = useAppSelector((state) => state.city);
  const offerlist = useAppSelector((state) => state.offerlist);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const offer = useAppSelector((state) => state.offer);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return(
    <HistoryRouter history={browserHistory}>
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
              authorizationStatus={authorizationStatus}
            >
              <FavouritePage
                offers = {offerlist}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {(offerlist.filter((o) => o.id === offer.id).length) > 0 ? <OfferPage offer = {offer} offerList={offerlist} city={city}/> : <NotFoundPage/>}
        />
        <Route
          path = '*'
          element = {<NotFoundPage/>}
        />

      </Routes>
    </HistoryRouter>
  );

}
export default App;
