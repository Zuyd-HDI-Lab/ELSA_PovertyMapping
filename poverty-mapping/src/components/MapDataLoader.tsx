import { useEffect, useState } from 'react';
import { FeatureCollection } from 'geojson';

const useMapDataLoader = (url: string) => {
    const [mapData, setMapData] = useState<FeatureCollection | null>(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((data: FeatureCollection) => setMapData(data))
            .catch(error => console.error('Error fetching map data:', error));
    }, [url]);

    return mapData;
};

export default useMapDataLoader;