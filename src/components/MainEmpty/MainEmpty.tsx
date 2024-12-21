import { AuthorizationStatus } from '../../mocks/login';
import CityList from '../CityList/CityList';
import UserHeaderInfo from '../UserHeaderInfo/UserHeaderInfo';

function MainEmpty({authStatus, userEmail, cityName}:{authStatus:AuthorizationStatus; userEmail:string; cityName:string}){
  return(
    <div className="page page--gray page--main">
      <UserHeaderInfo authStatus = {authStatus} userEmail = {userEmail}/>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmpty;
