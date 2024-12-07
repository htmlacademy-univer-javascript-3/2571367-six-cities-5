export type City = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
  placesToStay:number;
};

export type Point = {
  lat: number;
  lng: number;
};

export type CityMapPoint = {
  points:Point[];
  city:string;
}
