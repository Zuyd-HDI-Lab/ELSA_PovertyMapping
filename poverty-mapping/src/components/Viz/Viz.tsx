import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Feature, FeatureCollection } from 'geojson';
import * as d3 from 'd3';
import useMapDataLoader from '../MapDataLoader';
import { Filterlist, VizLegend, PeriodenList } from './constants';
import { AdditionalDataEntry, fetchAdditionalData } from './services/bijstandDataService';
import MapTooltip from './components/MapTooltip';
import { useTooltip } from './hooks/useTooltip';

interface VizProps {
    selectedFilters: string[];
    selectedPerioden: string | null;
}

const useMapRenderer = (
    svgRef: React.RefObject<SVGSVGElement>,
    mapData: FeatureCollection | null,
    processedMapData: FeatureCollection | null,
    getColor: (value: number | null | undefined) => string,
    handlers: ReturnType<typeof useTooltip>['handlers']
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
                .attr('fill', d => getColor(d.properties?.Bijstandsuitkering_10))
                .attr('stroke', 'black')
                .on('mouseover', handlers.handleMouseOver)
                .on('mousemove', handlers.handleMouseMove)
                .on('mouseout', handlers.handleMouseOut);
        }
    }, [getColor, processedMapData, mapData, handlers, svgRef]);
};

const useProcessMapData = (
    mapData: FeatureCollection | null,
    additionalData: Record<string, AdditionalDataEntry> | null,
    selectedPerioden: string | null
) => {
    const [processedMapData, setProcessedMapData] = useState<FeatureCollection | null>(null);

    useEffect(() => {
        if (mapData) {
            const updatedMapData = {
                ...mapData,
                features: mapData.features.map((feature) => ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        Bijstandsuitkering_10: selectedPerioden && additionalData ?
                            Object.values(additionalData).find(
                                (item) => item.WijkenEnBuurten.trim() === feature.properties?.["CBS-buurtcode"] &&
                                    item.Perioden === selectedPerioden
                            )?.Bijstandsuitkering_10 ?? null
                            : null
                    }
                }))
            };
            setProcessedMapData(updatedMapData);
        }
    }, [mapData, additionalData, selectedPerioden]);

    return processedMapData;
};

const useColorScale = (selectedFilters: string[]) => {
    const colorScale = useMemo(() =>
        d3.scaleLinear<string>()
            .domain([0, 20])
            .range(['green', 'red']),
        []
    );

    const getColor = useCallback((value: number | null | undefined) => {
        if (value === null || value === undefined) {
            return 'darkgray';
        }

        if (selectedFilters.includes(">10")) {
            return value > 10 ? colorScale(value) : 'gray';
        }

        return colorScale(value);
    }, [selectedFilters, colorScale]);

    return getColor;
};

const useZoom = (svgRef: React.RefObject<SVGSVGElement>) => {
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

const Viz: React.FC<VizProps> = ({ selectedFilters, selectedPerioden }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const mapData = useMapDataLoader('/heerlen_buurten_2023_formatted.json');
    const [additionalData, setAdditionalData] = useState<Record<string, AdditionalDataEntry> | null>(null);
    const { tooltipState, handlers } = useTooltip();

    const getColor = useColorScale(selectedFilters);
    const processedMapData = useProcessMapData(mapData, additionalData, selectedPerioden);

    useEffect(() => {
        if (selectedPerioden) {
            fetchAdditionalData(selectedPerioden)
                .then(setAdditionalData)
                .catch(error => console.error("Error loading additional data:", error));
        }
    }, [selectedPerioden]);

    useMapRenderer(svgRef, mapData, processedMapData, getColor, handlers);
    useZoom(svgRef);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
            <MapTooltip
                show={tooltipState.show}
                content={tooltipState.content}
                position={tooltipState.position}
            />
        </div>
    );
};
export default Viz;
export { Filterlist, VizLegend, PeriodenList }; 