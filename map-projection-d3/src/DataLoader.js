import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const useDataLoader = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(url).then(loadedData => {
      setData(loadedData);
    });
  }, [url]);

  return data;
};

export default useDataLoader;