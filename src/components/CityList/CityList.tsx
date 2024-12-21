import { CITY } from '../../mocks/city.ts';
import { changeCityAction } from '../../store/cityProcess.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link} from 'react-router-dom';
import { OfferDescription } from '../../types/offerDescription.ts';
import { getCity } from '../../store/selectors.ts';

function CityList({ offerList }: { offerList:OfferDescription[]}){
  const dispatch = useAppDispatch();
  const cityName = useAppSelector(getCity);

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((c)=>(
        <li key = {c.lat} className="locations__item">
          <a className={c.title === cityName ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
            onClick = {()=>{
              dispatch(changeCityAction((offerList.filter((offer) => offer.city.name === c.title))[0].city.name));
            }}
          >
            <Link to = "/"><span>{c.title}</span></Link>
          </a>
        </li>
      ))}
    </ul>
  );
}
export default CityList;
