import React, { useEffect } from 'react';
import * as d3 from 'd3';

const DataVisualizer = ({ data, mapData }) => {
  useEffect(() => {
    console.log('DataVisualizer mounted');
    console.log('Data:', data);

    const svg = d3.select('svg');

    // Filter the data to get only the rows where 'Opleidingsniveau' is 'Laag'
    const laagData = data.filter(d => d.Opleidingsniveau === 'Laag' || d.Opleidingsniveau === '2018700');
    const middelbaarData = data.filter(d => d.Opleidingsniveau === 'Middelbaar' || d.Opleidingsniveau === '2018740');
    const hoogData = data.filter(d => d.Opleidingsniveau === 'Hoog' || d.Opleidingsniveau === '2018790');

    // Filter the laagData to include only the regions present in the GeoJSON
    const filteredLaagData = laagData.filter(item =>
      mapData.features.some(feature => feature.properties['CBS-buurtcode'] === item.RegiocodeGemeenteWijkBuurt_1)
    );

    // Create a color scale for the 'Laag' opgeleiden based on the filtered data
    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(filteredLaagData, d => +d.Bevolking15Tot75Jaar_2)])
      .range(['green', 'red']);

    svg.selectAll('path')
      .attr('fill', d => {
        const regionData = filteredLaagData.find(item => item.RegiocodeGemeenteWijkBuurt_1 === d.properties['CBS-buurtcode']);
        if (regionData) {
          console.log(`Region: ${d.properties['CBS-buurtcode']}, Laag: ${regionData.Bevolking15Tot75Jaar_2}, Color: ${colorScale(+regionData.Bevolking15Tot75Jaar_2)}`);
          return colorScale(+regionData.Bevolking15Tot75Jaar_2);
        } else {
          console.log(`Region: ${d.properties['CBS-buurtcode']} not found in CSV data`);
          return 'lightblue';
        }
      });
  }, [data, mapData]);

  return null;
};

export default DataVisualizer;