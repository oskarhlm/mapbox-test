import mapboxgl from 'mapbox-gl';
import { NavigationControl } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './hooks';
import DeepComponent from './DeepComponent';

const mapStyle = 'mapbox://styles/keino/cl4gquaf0002i15jk5xldrn3u';
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2Vpbm8iLCJhIjoiOE5oc094SSJ9.DHxjhFy2Ef33iP8yqIm5cA';
mapboxgl.accessToken = MAPBOX_TOKEN;

const MapVanilla = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // const map = useRef<Map>();
  const { map, setMap } = useMap();

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map) return; // initialize map only once
    const newMap: mapboxgl.Map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
    });
    newMap.addControl(new NavigationControl(), 'bottom-right');
    newMap.on('moveend', () => console.log('moveend'));
    setMap(newMap);
  });

  return (
    <div ref={mapContainer} className="map-container">
      <div className="searchbar">
        <DeepComponent />
      </div>
    </div>
  );
};

export default MapVanilla;
