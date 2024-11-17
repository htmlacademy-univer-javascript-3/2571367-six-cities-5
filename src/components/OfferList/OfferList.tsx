
import { OfferDescription } from '../../types/offerDescription.ts';
import MainPageCard from '../MainPageCard/MainPageCard.tsx';

type OfferListProps = {
  onListItemHover: (listItemName: string) => void;
  offer:OfferDescription[];
};

function OfferList(OfferListProps:OfferListProps){
  const { onListItemHover, offer } = OfferListProps;

  return(
    <div className="cities__places-list places__list tabs__content">
      <MainPageCard offer = {offer[0]} onListItemHover = {onListItemHover}
        onAnswer={() => {
          throw new Error('Function \'onAnswer\' isn\'t implemented.');
        }}

      />
      <MainPageCard offer = {offer[1]} onListItemHover = {onListItemHover}
        onAnswer={() => {
          throw new Error('Function \'onAnswer\' isn\'t implemented.');
        }}
      />

      <MainPageCard offer = {offer[2]} onListItemHover = {onListItemHover}
        onAnswer={() => {
          throw new Error('Function \'onAnswer\' isn\'t implemented.');
        }}
      />

      <MainPageCard offer = {offer[3]} onListItemHover = {onListItemHover}
        onAnswer={() => {
          throw new Error('Function \'onAnswer\' isn\'t implemented.');
        }}
      />

      <MainPageCard offer = {offer[1]} onListItemHover = {onListItemHover}
        onAnswer={() => {
          throw new Error('Function \'onAnswer\' isn\'t implemented.');
        }}
      />

    </div>
  );
}
export default OfferList;
