import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../mocks/login.ts';
import App from './App.tsx';
import { withHistory, withStore } from '../utils/mockComponent.tsx';
import { makeFakeStore } from '../utils/mocks.ts';
import { datatype } from 'faker';
import { initialStateUserMock, mockUser } from '../mocks/storeMock.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const cityListTestId = 'citylist';
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({}));
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);
    const cityList = screen.getByTestId(cityListTestId);

    expect(cityList).toBeInTheDocument();
    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });


  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'email-input';
    const passwordFormTestId = 'password-input';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });


  it('should render "MainPage" when authorized user navigates to "/login"', () => {
    const cityListTestId = 'citylist';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(
      {User:
        {
          authorizationStatus:AuthorizationStatus.Auth,
          isUserDataLoading: false,
          userEmail: datatype.string()
        }}
    ));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    const cityList = screen.getByTestId(cityListTestId);

    expect(cityList).toBeInTheDocument();
    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });


  it('should render "loadingPage" when auth status is Unknown', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      User: initialStateUserMock,
    }));
    mockHistory.push(AppRoute.Main);
    const spinnerContainerTestId = 'spinner-container';
    const spinnerTestId = 'spinner';

    render(withStoreComponent);
    const spinnerContainer = screen.getByTestId(spinnerContainerTestId);
    const spinner = screen.getByTestId(spinnerTestId);

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });


  it('should render "FavouritePage" when auth status is Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      User: {
        authorizationStatus:AuthorizationStatus.Auth,
        isUserDataLoading: false,
        userEmail: datatype.string()
      },
    }));
    mockHistory.push(AppRoute.Favourites);

    const userInfoTestId = 'user-info';
    const favouritePageFooterTestId = 'empty-favourite-page-footer';

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const favouritePageFooter = screen.getByTestId(favouritePageFooterTestId);

    expect(userInfo).toBeInTheDocument();
    expect(favouritePageFooter).toBeInTheDocument();
  });

  it('should render "LoginPage" when auth status is NoAuth and route to Favourite Page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      User:mockUser,
    }));
    mockHistory.push(AppRoute.Favourites);
    const loginFormTestId = 'login-form';
    const emailFormTestId = 'email-input';
    const passwordFormTestId = 'password-input';


    render(withStoreComponent);
    const loginForm = screen.getByTestId(loginFormTestId);
    const emailForm = screen.getByTestId(emailFormTestId);
    const passwordForm = screen.getByTestId(passwordFormTestId);


    expect(loginForm).toBeInTheDocument();
    expect(emailForm).toBeInTheDocument();
    expect(passwordForm).toBeInTheDocument();
  });

  it('should render "OfferPage" when offer is in offerList', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const expectedOfferId = datatype.string();

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      Data:{
        offerlist: [{
          id: expectedOfferId,
          title: datatype.string(),
          type: datatype.string(),
          price: datatype.number(),
          city: {
            name: datatype.string(),
            location: {
              latitude: datatype.number(),
              longitude: datatype.number(),
              zoom: datatype.number(),
            }
          },
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          },
          isFavorite: datatype.boolean(),
          isPremium: datatype.boolean(),
          rating: datatype.number(),
          previewImage: datatype.string(),
        }],
        isOffersLoading: false,
        offer:{
          id: expectedOfferId,
          title: datatype.string(),
          type: datatype.string(),
          price: datatype.number(),
          city: {
            name: datatype.string(),
            location: {
              latitude: datatype.number(),
              longitude: datatype.number(),
              zoom: datatype.number(),
            }
          },
          location: {
            latitude: datatype.number(),
            longitude: datatype.number(),
            zoom: datatype.number(),
          },
          isFavorite: datatype.boolean(),
          isPremium: datatype.boolean(),
          rating: datatype.number(),
          description: datatype.string(),
          bedrooms: datatype.number(),
          goods: [(datatype.string())],
          host: {
            name: datatype.string(),
            avatarUrl: datatype.string(),
            isPro: datatype.boolean(),
          },
          images: [(datatype.string())],
          maxAdults: datatype.number(),
        },
        nearbyOffers:[],
        comments:[],
        favouriteList: []
      },
      User:{
        authorizationStatus:AuthorizationStatus.Auth,
        isUserDataLoading: false,
        userEmail: datatype.string()
      },
    }));
    mockHistory.push(`/offer/${expectedOfferId}`);
    const userInfoTestId = 'user-info';
    const offerGalleryTestId = 'offer-gallery';
    const offerInfoTestId = 'offer-info';
    const hostInfoTestId = 'host-info';
    const reviewListTestId = 'reviews';
    const reviewFormTestId = 'review-form';
    const mapTestId = 'map';
    const nearbyTestId = 'nearby-places';

    render(withStoreComponent);
    const userInfo = screen.getByTestId(userInfoTestId);
    const offerInfo = screen.getByTestId(offerInfoTestId);
    const offerGallery = screen.getByTestId(offerGalleryTestId);
    const hostInfo = screen.getByTestId(hostInfoTestId);
    const reviewList = screen.getByTestId(reviewListTestId);
    const reviewForm = screen.getByTestId(reviewFormTestId);
    const map = screen.getByTestId(mapTestId);
    const nearby = screen.getByTestId(nearbyTestId);

    expect(userInfo).toBeInTheDocument();
    expect(offerInfo).toBeInTheDocument();
    expect(offerGallery).toBeInTheDocument();
    expect(reviewList).toBeInTheDocument();
    expect(hostInfo).toBeInTheDocument();
    expect(reviewForm).toBeInTheDocument();
    expect(map).toBeInTheDocument();
    expect(nearby).toBeInTheDocument();
  });
  it('should render "NotFoundPage" when route is incorrect', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = datatype.string();
    mockHistory.push(`/${unknownRoute}`);
    const expectedText = 'Error 404. Page not found.';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
