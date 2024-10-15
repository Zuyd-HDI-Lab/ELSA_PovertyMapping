import React from 'react';
import './App.css';
import Map from './Map';
import useDataLoader from './DataLoader';
import useMapDataLoader from './MapDataLoader';
import DataVisualizer from './DataVisualizer';

const App: React.FC = () => {
  const dataLocalPath = '/data.csv';
  // const dataUrl = ''
  const mapLocalPath = '/heerlen_buurten_2023_formatted.json';
  // const mapUrl = 'https://gist.githubusercontent.com/mhjdemmers/2da23018a024c29c01690502a7f65210/raw/gistfile1.txt';
  const mapData = useMapDataLoader(mapLocalPath);
  const data = useDataLoader(dataLocalPath);

  console.log('Map Data:', mapData); // debug line
  console.log('Vis Data:', data); // debug line

  // Render the Map component if geojson data is available, otherwise show a loading message
  return (
    <div>
      {mapData && <Map mapData={mapData} />}
      {data.length > 0 && <DataVisualizer data={data} mapData={mapData} />}
    </div>
  );
}

export default App;
