import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Map = ({ mapData }) => {
  const svgRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (event, d) => {
    console.log('Mouse Over:', d); //debug line
    const name = d.properties.buurtnaam || `Unnamed Feature, id: ${d.properties.id}`;
    setTooltipContent(name);
    setTooltipPosition({ x: event.pageX, y: event.pageY });
    setShowTooltip(true);
  };

  const handleMouseMove = (event) => {
    // console.log('Mouse Move:', event.pageX, event.pageY); //debug line
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseOut = () => {
    // console.log('Mouse Out'); //debug line 
    setShowTooltip(false);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Create a Mercator projection and fit it to the GeoJSON data https://d3js.org/d3-geo/projection
    const projection = d3.geoMercator().fitSize([width, height], mapData);
    // Convert GeoJSON into SVG path 
    const path = d3.geoPath().projection(projection);

    svg
      .attr('width', width)
      .attr('height', height)
      .selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', 'lightblue')
      .attr('stroke', 'black')
      .on('mouseover', handleMouseOver)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut);
  }, [mapData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            backgroundColor: 'white',
            padding: '5px',
            border: '1px solid black',
            borderRadius: '3px',
            pointerEvents: 'none'
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Map;