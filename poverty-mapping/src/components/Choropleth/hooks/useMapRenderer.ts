import { useEffect } from 'react';
import { Feature, FeatureCollection } from 'geojson';
import * as d3 from 'd3';
import { TooltipHandlers } from './useTooltip.ts';

export const useMapRenderer = (
    svgRef: React.RefObject<SVGSVGElement>,
    mapData: FeatureCollection | null,
    processedMapData: FeatureCollection | null,
    getColor: (value: number | null | undefined) => string,
    handlers: TooltipHandlers
) => {
    useEffect(() => {
        if (mapData && svgRef.current) {
            const svg = d3.select(svgRef.current);
            const width = svg.node()?.clientWidth || 800;
            const height = svg.node()?.clientHeight || 600;

            const projection = d3.geoMercator().fitSize([width, height], processedMapData || mapData);
            const path = d3.geoPath().projection(projection);

            const paths = svg.selectAll<SVGPathElement, Feature>('path')
                .data(processedMapData?.features || []);

            paths.exit().remove();

            paths.enter()
                .append('path')
                .merge(paths)
                .attr('d', path)
                .attr('fill', d => getColor(d.properties?.dataValue))
                .attr('stroke', 'black')
                .on('mouseover', handlers.handleMouseOver)
                .on('mousemove', handlers.handleMouseMove)
                .on('mouseout', handlers.handleMouseOut);
        }
    }, [getColor, processedMapData, mapData, handlers, svgRef]);
}; 