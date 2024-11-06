import { useEffect, useState } from 'react';
import * as d3 from 'd3';

// Define a generic type for the CSV data rows.
interface DataRow {
  [key: string]: string;  // This assumes all values in the CSV are strings.
}

const useDataLoader = (url: string): DataRow[] => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        d3.csv(url).then((loadedData) => {
            setData(loadedData);
        });
    }, [url]);

    return data;
};

export default useDataLoader;
