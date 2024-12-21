
import {Link} from 'react-router-dom';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo';
import React from 'react';
import { AuthorizationStatus } from '../../mocks/login';

function NotFoundPage({userEmail, authStatus}:{userEmail:string; authStatus:AuthorizationStatus}):JSX.Element{
  return(
    <div className="page page--gray page--main">
      <UserHeaderInfo userEmail={userEmail} authStatus={authStatus}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
          <h2 style={{ textAlign : 'center'}}>Error 404. Page not found. <Link to = "/"> Back to main page</Link></h2>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default React.memo(NotFoundPage);
