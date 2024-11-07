import React, { useEffect, useRef, useState } from 'react';
import { FeatureCollection, Feature } from 'geojson';
import * as d3 from 'd3';

interface MapProps {
    mapData: FeatureCollection;
}

const Map: React.FC<MapProps> = ({ mapData }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseOver = (event: MouseEvent, d: Feature) => {
        const name = d.properties?.buurtnaam || `Unnamed Feature, id: ${d.properties?.id}`;
        setTooltipContent(name);
        setTooltipPosition({ x: event.pageX, y: event.pageY });
        setShowTooltip(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        setTooltipPosition({ x: event.pageX, y: event.pageY });
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svg.node()?.clientWidth || 800;
        const height = svg.node()?.clientHeight || 600;

        const projection = d3.geoMercator().fitSize([width, height], mapData);
        const path = d3.geoPath().projection(projection);

        svg.selectAll('*').remove();

        const g = svg.append('g');

        g.selectAll('path')
            .data(mapData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', 'lightblue')
            .attr('stroke', 'black')
            .on('mouseover', handleMouseOver)
            .on('mousemove', handleMouseMove)
            .on('mouseout', handleMouseOut);

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform.toString());
            });

        svg.call(zoom);

    }, [mapData]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg id="data-visualizer-svg" ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
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
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default Map;
