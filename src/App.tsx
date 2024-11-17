import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import FavoritesPage from './components/FavoritesPage';
import LoginPage from './components/LoginPage';
import OfferPage from './components/OfferPage';
import Error404 from './components/Error404';
import PrivateRoute from './components/PrivateRoute';

type Offer = {
  id: number;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  previewImage: string;
};

type AppProps = {
  offers: Offer[];
};

export default function App({ offers }: AppProps) {
  const isAuth = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              {<FavoritesPage offers={offers} />}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
