import mapboxgl, { CameraOptions } from 'mapbox-gl';
import { NavigationControl } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMap } from './hooks';
import scrollama from 'scrollama';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';
import React from 'react';

const mapStyle = 'mapbox://styles/keino/cl4gquaf0002i15jk5xldrn3u';
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoia2Vpbm8iLCJhIjoiOE5oc094SSJ9.DHxjhFy2Ef33iP8yqIm5cA';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface Chapter {
  id: string;
  title: string;
  image: string;
  description: string;
  location: CameraOptions;
  onChapterEnter: any[];
  onChapterExit: any[];
}

const chapters: Chapter[] = [
  {
    id: 'overallMap',
    title: 'Subway Ridership Plummets',
    image: 'images/Chapter_1_Image.jpg',
    description:
      'All around the city subway ridership plummeted during the first two weeks of the Covid-19 outbreak. On average, stations saw a decrease of more than 50% in entries and exits between March 6th and March 20th, 2020. But as this map shows, the drop in ridership did not happen uniformly throughout the city.',
    location: {
      center: [-74, 41.725],
      zoom: 10,
      pitch: 0,
      bearing: 0,
    },
    onChapterEnter: [],
    onChapterExit: [],
  },
  {
    id: 'incomeUnderlay',
    title: 'Forced to work and take the subway',
    image: 'images/Chapter_2_Image.jpg',
    description:
      'Income inequality certainly played a role in the uneven distribution of subway usage. By overlaying median household income and change in subway entries it becomes clear that those stations with less change are located in low-income areas, specially in the Bronx and outer Queens and Brooklyn.',
    location: {
      center: [-74, 40.725],
      zoom: 10,
      pitch: 0,
      bearing: 0,
    },
    onChapterEnter: [
      {
        layer: 'medianIncome',
        opacity: 1,
      },
    ],
    onChapterExit: [
      {
        layer: 'medianIncome',
        opacity: 0,
      },
    ],
  },
  {
    id: 'elmhurstHospital',
    title: 'The epicenter of the outbreak',
    image: 'images/Chapter_3_Image.jpg',
    description:
      'Elmhurst Hospital Center has been identified as one of the hospitals most overwhelmed by the number of patients with COVID-19 it has received. Located in a low-middle-income area of the city, with a median household income of around $50,000, the hospital serves one of the most diverse and immigrant dense areas of the city. The three subway stations around the hospital have all seen relatively small change in their usage compare to the rest of the city.',
    location: {
      center: [-73.886201, 40.744566],
      zoom: 16,
      pitch: 40,
      bearing: -7,
    },
    onChapterEnter: [
      {
        layer: 'medianIncome',
        opacity: 0,
      },
    ],
    onChapterExit: [
      {
        layer: 'medianIncome',
        opacity: 0,
      },
    ],
  },
  {
    id: 'southBronx',
    title: 'The South Bronx, as Always',
    image: 'images/Chapter_4_Image.jpg',
    description:
      "The South Bronx, perennially marred in social injustice, has also been hard hit during the current COVID-19 outbreak. The area's three main neighborhoods, Mott Haven, Melrose and Port Morris are mostly home to low-income families that have been forced to continue going to work, risking their health and that of their loved ones. Similarly to Jackson Heights in Queens, the areas subway stations have seen a smaller decrease in use than the rest of the city. Median household income in this area oscillates between $15,000 and $30,000.",
    location: {
      center: [-73.918037, 40.816093],
      zoom: 15,
      pitch: 40,
      bearing: 8,
    },
    onChapterEnter: [
      {
        layer: 'medianIncome',
        opacity: 1,
      },
    ],
    onChapterExit: [
      {
        layer: 'medianIncome',
        opacity: 0,
      },
    ],
  },
];

const StoryMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { map, setMap } = useMap();

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map) return;
    const newMap: mapboxgl.Map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
    });
    newMap.addControl(new NavigationControl(), 'bottom-right');
    newMap.on('moveend', () => console.log('moveend'));
    configureScroller(newMap);
    setMap(newMap);
  });

  const configureScroller = (map: mapboxgl.Map) => {
    const story = document.getElementById('story');
    const features = document.createElement('div');

    features.classList.add('left');
    features.setAttribute('id', 'features');

    chapters.forEach((record: any, idx: number) => {
      const container = document.createElement('div');
      const root = createRoot(container);

      container.classList.add('step');
      if (idx === 0) container.classList.add('active');

      const element = (
        <div className={'light'}>
          <h3>{record.title}</h3>
          <p>{record.description}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => console.log('this nice')}
          >
            hihihihi
          </Button>
        </div>
      );

      root.render(element);

      features.appendChild(container);
    });

    story?.appendChild(features);

    const scroller = scrollama();
    scroller
      .setup({
        step: '.step',
        offset: 0.5,
        progress: true,
      })
      .onStepEnter((response) => {
        const chapter = chapters[response.index];
        response.element.classList.add('active');
        map.flyTo(chapter.location);
        // if (config.showMarkers) {
        //   marker.setLngLat(chapter.location.center);
        // }
        // if (chapter.onChapterEnter.length > 0) {
        //   chapter.onChapterEnter.forEach(setLayerOpacity);
        // }
      })
      .onStepExit((response) => {
        const chapter = chapters.find(
          (chap: any) => chap.id === response.element.id
        );
        response.element.classList.remove('active');
        // if (chapter.onChapterExit.length > 0) {
        //   chapter.onChapterExit.forEach(setLayerOpacity);
        // }
      });

    window.addEventListener('resize', scroller.resize);
  };

  return (
    <div>
      <div id="test"></div>
      <div ref={mapContainer} id="map"></div>
      <div id="story"></div>
    </div>
  );
};

export default StoryMap;
