import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import FavoritesPage from './components/FavoritesPage';
import LoginPage from './components/LoginPage';
import OfferPage from './components/OfferPage';
import Error404 from './components/Error404';
import PrivateRoute from './components/PrivateRoute';

export default function App() {

  const offers = 312;
  const isAuth = false;

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage offers={offers} />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/offer/:id' element={<OfferPage />} />
        <Route path='*' element={<Error404 />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuth={isAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
