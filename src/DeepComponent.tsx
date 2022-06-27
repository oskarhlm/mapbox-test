import { useMap } from './hooks';

const DeepComponent = () => {
  const { map } = useMap();

  return (
    <>
      <h1 style={{ backgroundColor: 'blue', zIndex: 1000 }}>
        I'm Deep, how are you?
      </h1>
      <button onClick={() => map?.setZoom(11)}>Zoom in</button>
    </>
  );
};

export default DeepComponent;
