import { useMemo } from 'react';
import { OfferDescription } from '../types/offerDescription';
import { FILTERS } from '../mocks/filter';

export const useFilter = (offerList:OfferDescription[], selectedFilter:string): OfferDescription[] =>
  useMemo(() => {
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
