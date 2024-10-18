import { useEffect, useState } from 'react';

const useMapDataLoader = (url) => {
  const [mapData, setMapData] = useState(null);
  console.log('MapDataLoader mounted'); // debug line

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setMapData(data));
  }, [url]);

  return mapData;
};

export default useMapDataLoader;