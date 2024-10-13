import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';

function App() {
  const [geojson, setGeojson] = useState(null);

  // Fetch GeoJSON data
  useEffect(() => {
    const localPath = '/heerlen_buurten_2023_formatted.json'
    const url = 'https://gist.githubusercontent.com/mhjdemmers/2da23018a024c29c01690502a7f65210/raw/gistfile1.txt';
    fetch(localPath)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched GeoJSON Data:', data); // debug line
        setGeojson(data);
      })
      .catch(error => console.error('Error fetching the GeoJSON data:', error));
  }, []);

  // Render the Map component if geojson data is available, otherwise show a loading message
  return (
    <div className="App">
      {geojson ? <Map geojson={geojson} /> : <p>Loading map...</p>}
    </div>
  );
}

export default App;