import { useMap } from './hooks';

const HighLevelComponent = () => {
  const { map } = useMap();

  const zoomOut = () => {
    map?.setZoom(7);
  };

  return <button onClick={zoomOut}>Zoom out</button>;
};

export default HighLevelComponent;
