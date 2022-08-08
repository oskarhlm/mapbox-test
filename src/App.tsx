import './App.css';
import MapVanilla from './MapVanilla';
import { MapProvider } from './MapContext';
import HighLevelComponent from './HighLevelComponent';
import StoryMap from './StoryMap';
import StoryMapv2 from './StoryMapv2';

const App = () => {
  return (
    <>
      <MapProvider>
        {/* <HighLevelComponent />
        <MapVanilla /> */}
        {/* <StoryMap /> */}
        <StoryMapv2 />
      </MapProvider>
    </>
  );
};

export default App;
