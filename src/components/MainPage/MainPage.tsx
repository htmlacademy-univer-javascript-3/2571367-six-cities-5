
import { useState, useMemo } from 'react';
import OfferList from '../OfferList/OfferList.tsx';
import { Link } from 'react-router-dom';
import Map from '../Map/Map';
import { useAppSelector } from '../../hooks';
import { CITY } from '../../mocks/city.ts';
import CityList from '../CityList/CityList.tsx';
import { OfferDescription } from '../../types/offerDescription.ts';
import SortFilter from '../SortFilter/SortFilter.tsx';
import { FILTERS } from '../../mocks/filter';

function MainPage({ offerList }: { offerList: OfferDescription[] }): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<OfferDescription | undefined>(undefined);
  const [selectedFilter, setFilter] = useState<string>(FILTERS[0]);
  const cityName = useAppSelector((state) => state.city);
  const sortedOffers = useMemo(() => {
    const sorted = [...offerList];
    switch (selectedFilter) {
      case FILTERS[1]:
        return sorted.sort((a, b) => a.price - b.price);
      case FILTERS[2]:
        return sorted.sort((a, b) => b.price - a.price);
      case FILTERS[3]:
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [offerList, selectedFilter]);
  const handleListItemHover = (listItemId: string) => {
    const currentPoint = offerList.find((point) => point.id === listItemId);
    if (currentPoint !== selectedPoint) {
      setSelectedPoint(currentPoint);
    }
  };

  const handleFilterEnter = (filter: string) => {
    if (filter !== selectedFilter) {
      setFilter(filter);
    }
  };

  return(
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <Link to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
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
            <CityList offerList={offerList} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerList.filter((i)=> i.city.name === cityName).length} places to stay in {cityName}</b>
              <form className="places__sorting" action="#" method="get">
                <SortFilter filter={selectedFilter} handleFilterEnter={handleFilterEnter} />
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offer={sortedOffers} onListItemHover={handleListItemHover} isMainPage city={cityName}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={CITY.filter((c) => c.title === cityName)[0]}
                  selectedOffer={offerList.filter((i) => i.id === selectedPoint?.id)[0] }
                  offerList={offerList}
                  height={407.27}
                  width={512}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default MainPage;
