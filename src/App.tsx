import './App.css';
import MapVanilla from './MapVanilla';
import { MapProvider } from './MapContext';
import HighLevelComponent from './HighLevelComponent';
import StoryMap from './StoryMap';

const App = () => {
  return (
    <>
      <MapProvider>
        {/* <HighLevelComponent />
        <MapVanilla /> */}
        <StoryMap />
      </MapProvider>
    </>
  );
};

export default App;
