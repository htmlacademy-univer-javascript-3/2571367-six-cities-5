import { CITY } from '../../mocks/city.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { changeCityAction, offerFillAction } from '../../store/cityAction.ts';
import {Link} from 'react-router-dom';
import { offer } from '../../mocks/offers.ts';

function CityList(){
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITY.map((c)=>(
        <li key = {c.lat} className="locations__item">
          <a className={c.title === cityName ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
            onClick = {()=>{
              dispatch(changeCityAction(CITY.filter((city) => city.title === c.title)[0]));
              dispatch(offerFillAction(offer.filter((city) => city.city === c.title)[0]));
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
