import './App.css';
import MapVanilla from './MapVanilla';
import { MapProvider } from './MapContext';
import HighLevelComponent from './HighLevelComponent';

const App = () => {
  return (
    <>
      <MapProvider>
        <HighLevelComponent />
        <MapVanilla />
      </MapProvider>
    </>
  );
};

export default App;
