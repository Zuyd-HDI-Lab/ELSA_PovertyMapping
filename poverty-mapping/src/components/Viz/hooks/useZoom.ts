import { useEffect } from 'react';
import * as d3 from 'd3';

export const useZoom = (svgRef: React.RefObject<SVGSVGElement>) => {
    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const zoom = d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.5, 8])
                .on('zoom', (event) => {
                    svg.selectAll('path').attr('transform', event.transform.toString());
                });

            svg.call(zoom);
        }
    }, [svgRef]);
}; 