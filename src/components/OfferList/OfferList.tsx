
import { OfferDescription } from '../../types/offerDescription.ts';
import MainPageCard from '../MainPageCard/MainPageCard.tsx';

type OfferListProps = {
  onListItemHover: (listItemName: string) => void;
  offer:OfferDescription[];
  isMainPage:boolean;
};

function OfferList(OfferListProps:OfferListProps){
  const { onListItemHover, offer , isMainPage} = OfferListProps;

  return(
    <div className={isMainPage ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}>
      {offer.map((offerItem) => (
        <MainPageCard
          key={offerItem.id}
          offer={offerItem}
          onListItemHover={onListItemHover}
          isMainPage={isMainPage}
          onAnswer={() => {
            throw new Error('Function \'onAnswer\' isn\'t implemented.');
          }}
        />
      ))}
    </div>
  );
}
export default OfferList;
