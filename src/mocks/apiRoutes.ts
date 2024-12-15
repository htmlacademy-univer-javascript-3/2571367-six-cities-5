export enum APIRoute {
  OfferList = '/offers',
  OfferInfo = '/offers/{offerId}',
  Nearby = '/offers/{offerId}/nearby',
  FavouriteList = '/favorite',
  SetFavourite = '/favorite/{offerId}/{status}',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export const TIMEOUT_SHOW_ERROR = 2000;
