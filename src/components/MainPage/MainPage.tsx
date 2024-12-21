import { useState, useMemo, useCallback } from 'react';
import OfferList from '../OfferList/OfferList.tsx';
import Map from '../Map/Map';
import { useAppSelector } from '../../hooks';
import { CITY } from '../../mocks/city.ts';
import CityList from '../CityList/CityList.tsx';
import { OfferDescription } from '../../types/offerDescription.ts';
import SortFilter from '../SortFilter/SortFilter.tsx';
import { FILTERS } from '../../mocks/filter';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo.tsx';
import { useFilter } from '../../hooks/useFilter.ts';
import { getAuthorizationStatus, getCity, getUserEmail } from '../../store/selectors.ts';

function MainPage({ offerList }: { offerList: OfferDescription[] }): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<OfferDescription | undefined>(undefined);
  const [selectedFilter, setFilter] = useState<string>(FILTERS[0]);
  const cityName = useAppSelector(getCity);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const sortedOffers = useFilter(offerList, selectedFilter);

  const city = useMemo(() => CITY.filter((c) => c.title === cityName)[0],[cityName]);
  const offerListMap = useMemo(() => offerList,[offerList]);
  const selectedOffer = useMemo(() => offerList.filter((i) => i.id === selectedPoint?.id)[0],[selectedPoint, offerList]);
  const sortedOffersMemo = useMemo(() => sortedOffers, [sortedOffers]);
  const authStatusMemo = useMemo(() => authStatus, [authStatus]);
  const userEmailMemo = useMemo(() => userEmail, [userEmail]);
  const selectedFilterMemo = useMemo(() => selectedFilter,[selectedFilter]);

  const handleListItemHover = useCallback((listItemId: string) => {
    const currentPoint = offerList.find((point) => point.id === listItemId);
    if (currentPoint !== selectedPoint) {
      setSelectedPoint(currentPoint);
    }
  },[offerList, selectedPoint]);

  const handleFilterEnter = useCallback((filter: string) => {
    if (filter !== selectedFilter) {
      setFilter(filter);
    }
  },[selectedFilter]);

  return(
    <div className="page page--gray page--main">
      <UserHeaderInfo authStatus={authStatusMemo} userEmail={userEmailMemo}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container" data-testid="citylist">
            <CityList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerList.filter((i)=> i.city.name === cityName).length} places to stay in {cityName}</b>
              <form className="places__sorting" action="#" method="get">
                <SortFilter filter={selectedFilterMemo} handleFilterEnter={handleFilterEnter} />
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OfferList offer={sortedOffersMemo} onListItemHover={handleListItemHover} isMainPage city={cityName}/>
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={city}
                  selectedOffer={selectedOffer}
                  offerList={offerListMap}
                  height={850}
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

export default (MainPage);
