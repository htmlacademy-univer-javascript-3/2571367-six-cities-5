import { Point } from './points';
export type OfferDescription = {
  images:string[];
  isPremium:boolean;
  offerName:string;
  raiting:number;
  features:string[];
  price:number;
  bookmark:string;
  raitingStars:string;
  inside:string[];
  hostName:string;
  hostStatus:string;
  hostAvatar:string;
  description:string[];
  id:string;
  point:Point;
};

export type CityOfferDescription = {
  offer:OfferDescription[];
  city:string;
}
