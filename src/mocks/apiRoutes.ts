export enum APIRoute {
  OfferList = '/offers',
  OfferInfo = '/offers/{offerId}',
  Nearby = '/offers/{offerId}/nearby',
  FavouriteList = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export const TIMEOUT_SHOW_ERROR = 2000;
