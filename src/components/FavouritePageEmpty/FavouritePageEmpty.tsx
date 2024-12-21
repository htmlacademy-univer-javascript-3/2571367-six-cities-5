import React from 'react';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo';
import { AuthorizationStatus } from '../../mocks/login';

type FavouritePageEmptyProps = {
    authStatus: AuthorizationStatus;
    userEmail: string;
}

function FavouritePageEmpty({ authStatus, userEmail }: FavouritePageEmptyProps){
  return (
    <div className="page">
      <UserHeaderInfo authStatus = {authStatus} userEmail = {userEmail}/>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer container" data-testid = "empty-favourite-page-footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>

  );
}

export default React.memo(FavouritePageEmpty);
