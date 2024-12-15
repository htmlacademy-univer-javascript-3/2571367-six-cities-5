export enum APIRoute {
  OfferList = '/offers',
  OfferInfo = '/offers/{offerId}',
  Nearby = '/offers/{offerId}/nearby',
  FavouriteList = '/favorite',
  SetFavourite = '/favorite/{offerId}/{status}',
  Comments = '/comments/{offerId}',
  Auth = '/login',
  LogOut = '/logout'
}
