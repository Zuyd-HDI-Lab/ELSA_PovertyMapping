import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Map = ({ geojson }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    const projection = d3.geoMercator().fitSize([width, height], geojson);
    const path = d3.geoPath().projection(projection);

    svg
      .attr('width', width)
      .attr('height', height)
      .selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'lightblue')
      .attr('stroke', 'black');
  }, [geojson]);

  return <svg ref={svgRef}></svg>;
};

export default Map;