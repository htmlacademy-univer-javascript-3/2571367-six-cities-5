
import { useRef, useEffect } from 'react';

import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { City, Point } from '../../types/points';
import { OfferDescription } from '../../types/offerDescription';

type MapProps = {
  city: City;
  selectedPoint: Point | undefined;
  height:number;
  width:number;
  offer:OfferDescription[];
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin.svg',
  iconSize: [25, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../../markup/img/pin-active.svg',
  iconSize: [25, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, selectedPoint,height, width, offer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.lat, city.lng], city.zoom);
      const markerLayer = layerGroup().addTo(map);
      offer.forEach((point) => {
        const marker = new Marker({
          lat: point.point.lat,
          lng: point.point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.point.lat === selectedPoint.lat
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offer, selectedPoint, city.zoom, city.lat, city.lng]);

  return <div style={{ height: `${height}px`, width: `${width}px`, margin: '0 auto' }} ref={mapRef}></div>;
}

export default Map;
