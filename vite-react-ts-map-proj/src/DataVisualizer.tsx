import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Feature, Geometry, GeoJsonProperties} from 'geojson';

// Define types for the props and data structures
interface DataRow {
    Opleidingsniveau: string;
    RegiocodeGemeenteWijkBuurt_1: string;
    Bevolking15Tot75Jaar_2: number;
}

interface GeoJSON {
    type: string;
    features: Feature<Geometry, GeoJsonProperties>[];
}

interface DataVisualizerProps {
    data: DataRow[];
    mapData: GeoJSON;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ data, mapData }) => {
    useEffect(() => {
        console.log('DataVisualizer mounted');
        console.log('Data:', data);

        const svg = d3.select('svg');

        // Filter the data to get only the rows where 'Opleidingsniveau' is 'Laag'
        const laagData = data.filter(d => d.Opleidingsniveau === 'Laag');

        // Filter the laagData to include only the regions present in the GeoJSON
        const filteredLaagData = laagData.filter(item =>
            mapData.features.some(feature => feature.properties?.['CBS-buurtcode'] === item.RegiocodeGemeenteWijkBuurt_1)
        );  

        // Create a color scale for the 'Laag' opgeleiden based on the filtered data
        const colorScale = d3.scaleLinear<string>()
            .domain([0, d3.max(filteredLaagData, d => +d.Bevolking15Tot75Jaar_2) || 0])
            .range(['green', 'red']);

        svg.selectAll<SVGPathElement, GeoJSON.Feature>('path')
            .attr('fill', d => {
                const regionData = filteredLaagData.find(item => item.RegiocodeGemeenteWijkBuurt_1 === d.properties?.['CBS-buurtcode']);
                if (regionData) {
                    console.log(`Region: ${d.properties?.['CBS-buurtcode']}, Laag: ${regionData.Bevolking15Tot75Jaar_2}, Color: ${colorScale(+regionData.Bevolking15Tot75Jaar_2)}`);
                    return colorScale(+regionData.Bevolking15Tot75Jaar_2);
                } else {
                    console.log(`Region: ${d.properties?.['CBS-buurtcode']} not found in CSV data`);
                    return 'lightblue';
                }
            });
        }, [data, mapData]);

    return null;
};

export default DataVisualizer;
