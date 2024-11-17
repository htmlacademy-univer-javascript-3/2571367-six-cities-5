import OfferCard from './OfferCard';

type Offer = {
  id: number;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  previewImage: string;
};

type FavoritesPageProps = {
  offers: Offer[];
};

const FavoritesPage = ({ offers }: FavoritesPageProps) => (
  <div className="page">
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listings</h1>
          <div className="favorites__list">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default FavoritesPage;
