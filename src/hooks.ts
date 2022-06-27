import { useContext } from 'react';
import { MapCtx } from './MapContext';

export function useMap() {
  const context = useContext(MapCtx);
  if (context === undefined)
    throw Error('You forgot to wrap your app with <MapProvider />');
  return { map: context.map, setMap: context!.setMap };
}
