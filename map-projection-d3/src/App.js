import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';

function App() {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    const localPath = '/heerlen_buurten_2023.json'
    const url = 'https://gist.githubusercontent.com/mhjdemmers/2da23018a024c29c01690502a7f65210/raw/gistfile1.txt';
    fetch(localPath)
      .then(response => response.json())
      .then(data => setGeojson(data))
      .catch(error => console.error('Error fetching the GeoJSON data:', error));
  }, []);

  return (
    <div className="App">
      {geojson ? <Map geojson={geojson} /> : <p>Loading map...</p>}
    </div>
  );
}

export default App;