import { FILTERS } from '../../mocks/filter';
import {MouseEvent} from 'react';
import { useState } from 'react';

type sortFilterProp = {
    filter:string;
    handleFilterEnter:(filter: string) => void;
}
function SortFilter(sortFilterProp:sortFilterProp){

  const [isFilterSelected, setFilterSelected] = useState <boolean>(true);

  const {filter, handleFilterEnter} = sortFilterProp;
  const handleFilterClick = (event: MouseEvent<HTMLLIElement>, f:string) => {
    event.preventDefault();
    handleFilterEnter((f));
    setFilterSelected(true);
  };

  const handleFilterArrowHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setFilterSelected(false);
  };

  const handleListMouseLeave = (event: React.MouseEvent<HTMLUListElement>) => {
    const relatedTarget = event.relatedTarget as Element | null;
    if (!relatedTarget || !relatedTarget.closest('.places__options')) {
      setFilterSelected(true);
    }
  };

  return(
    <>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}
        onMouseEnter={handleFilterArrowHover}
      >
        {filter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select">
          </use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened"
        onMouseLeave={handleListMouseLeave}
      >
        {isFilterSelected ? null : FILTERS.map((f) => (
          <li key={f} className={f === filter ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
            onMouseDown={(event) => handleFilterClick(event,f)}
          >
            {f}
          </li>
        ))}
      </ul>
    </>
  );
}
export default SortFilter;
