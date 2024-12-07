
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index.tsx';
import { CITY } from '../../mocks/city.ts';
import { Point } from '../../types/points.ts';
import { CityOfferDescription } from '../../types/offerDescription.ts';
import CityList from '../CityList/CityList.tsx';
import Map from '../Map/Map';
import OfferList from '../../components/OfferList/OfferList.tsx';

function MainPage({ MapProps }: { MapProps:CityOfferDescription}):JSX.Element{
  const {offer} = MapProps;
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);
  const cityName = useAppSelector((state) => state.city);

  const handleListItemHover = (listItemId: string) => {
    const currentPoint = offer.find((point) => point.id.toString() === listItemId)?.point;
    setSelectedPoint(currentPoint);
  };

  return(
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <Link to = "/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{CITY.filter((c) => c.title === cityName)[0].placesToStay} places to stay in {cityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offer={offer} onListItemHover={handleListItemHover} isMainPage />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={CITY.filter((c) => c.title === cityName)[0]} selectedPoint={selectedPoint } offer={MapProps.offer} height={407.27} width={512} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
