
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
import { useMemo } from 'react';
import { getAuthorizationStatus, getCity, getOffer, getOfferList, getUserEmail, isLoading } from '../store/selectors.ts';

function App(): JSX.Element {

  const authStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatus = useMemo(() => authStatus,[authStatus]);

  const cityName = useAppSelector(getCity);
  const city = useMemo(() => cityName,[cityName]);

  const getList = useAppSelector(getOfferList);
  const offerList = useMemo(() => getList,[getList]);

  const isLoadingStatus = useAppSelector(isLoading);
  const isDataLoading = useMemo(() => isLoadingStatus, [isLoadingStatus]);

  const gotOffer = useAppSelector(getOffer);
  const offer = useMemo(() => gotOffer,[gotOffer]);

  const gotUserEmail = useAppSelector(getUserEmail);
  const userEmail = useMemo(() => gotUserEmail,[gotUserEmail]);

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
          element = {<MainPage offerList={offerList}/>}
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
                offers = {offerList}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = {AppRoute.Offer}
          element = {(offerList.filter((o) => o.id === offer.id).length) > 0 ? <OfferPage offer = {offer} offerList={offerList} city={city}/> : <NotFoundPage userEmail={userEmail} authStatus={authorizationStatus}/>}
        />
        <Route
          path = '*'
          element = {<NotFoundPage userEmail={userEmail} authStatus={authorizationStatus}/>}
        />

      </Routes>
    </HistoryRouter>
  );

}
export default App;
