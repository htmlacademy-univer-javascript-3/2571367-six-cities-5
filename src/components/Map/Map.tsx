
import { useRef, useEffect } from 'react';

import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { City } from '../../types/points';
import { OfferDescription } from '../../types/offerDescription';

type MapProps = {
  city: City;
  height:number;
  width:number;
  offerList:OfferDescription[];
  selectedOffer:OfferDescription;
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
  const {city,height, width, offerList, selectedOffer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.lat, city.lng], city.zoom);
      const markerLayer = layerGroup().addTo(map);
      offerList.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && point.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offerList, selectedOffer, city.zoom, city.lat, city.lng]);

  return <div style={{ height: `${height}px`, width: `${width}px`, margin: '0 auto' }} ref={mapRef}></div>;
}

export default Map;
