import { useEffect, useState } from 'react';

const useMapDataLoader = (url) => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setMapData(data));
  }, [url]);

  return mapData;
};

export default useMapDataLoader;