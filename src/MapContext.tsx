import { Map } from 'mapbox-gl';
import React, { createContext, useState } from 'react';

interface IMapContext {
  map: Map | null;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

export const MapCtx = createContext<IMapContext>({} as IMapContext);

interface Props {
  children?: React.ReactNode;
}

export const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<Map | null>(null);

  return <MapCtx.Provider value={{ map, setMap }}>{children}</MapCtx.Provider>;
};
