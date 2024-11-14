import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Feature } from 'geojson';
import * as d3 from 'd3';
import useMapDataLoader from '../MapDataLoader';
import { Filterlist, VizLegend } from './constants';

// Move the interfaces here
interface VizProps {
    selectedFilters: string[];
}

interface FeatureProperties {
    id: number;
    "CBS-buurtcode": string;
    buurtnaam: string;
    Bijstandsuitkering_10?: number | null;
}

interface AdditionalDataEntry {
    ID: number;
    WijkenEnBuurten: string;
    Perioden: string;
    Codering_3: string;
    Bijstandsuitkering_6: number;
    Bijstandsuitkering_10: number;
    InwonersVanaf15Jaar_13: number;
    InwonersVanaf15JrTotAOWLeeftijd_14: number;
    InwonersVanafDeAOWLeeftijd_15: number;
}

const Viz: React.FC<VizProps> = ({ selectedFilters }) => {
    // Component implementation from original file
    // Reference lines 47-168 from the original Viz.tsx
    const perioden = "2023MM03";
    const svgRef = useRef<SVGSVGElement | null>(null);
    const mapData = useMapDataLoader('/heerlen_buurten_2023_formatted.json');
    const [additionalData, setAdditionalData] = useState<Record<string, AdditionalDataEntry> | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const colorScale = useMemo(() =>
        d3.scaleLinear<string>()
            .domain([0, 15])
            .range(['green', 'red']),
        []
    );

    useEffect(() => {
        fetch('/85586NED_TypedDataSet_11112024_142716.json')
            .then(response => response.json())
            .then(data => setAdditionalData(data.value as Record<string, AdditionalDataEntry>))
            .catch(error => console.error("Error loading additional data:", error));
    }, []);

    useEffect(() => {
        if (mapData && additionalData) {
            mapData.features = mapData.features.map((feature) => {
                const buurtCode = (feature.properties as FeatureProperties)?.["CBS-buurtcode"];
                const matchedData = Object.values(additionalData).find(
                    (item) => item.WijkenEnBuurten.trim() === buurtCode && item.Perioden === perioden
                );

                (feature.properties as FeatureProperties).Bijstandsuitkering_10 = matchedData?.Bijstandsuitkering_10 ?? null;
                return feature;
            });
        }
    }, [mapData, additionalData]);

    const handleMouseOver = (event: React.MouseEvent<SVGPathElement, MouseEvent>, d: Feature) => {
        const name = d.properties?.buurtnaam || `Unnamed Feature, id: ${d.properties?.id}`;
        const benefitAmount = d.properties?.Bijstandsuitkering_10 ?? 'No data';

        setTooltipContent(`${name} \n Bijstandsuitkering ${benefitAmount}%`);
        setTooltipPosition({ x: event.pageX + 10, y: event.pageY - 10 });
        setShowTooltip(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        setTooltipPosition({ x: event.pageX, y: event.pageY });
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };

    const getColor = useCallback((value: number | null | undefined) => {
        if (value === null || value === undefined) {
            return 'darkgray';
        }

        if (selectedFilters.includes(">10")) {
            return value > 10 ? colorScale(value) : 'gray';
        }

        return colorScale(value);
    }, [selectedFilters, colorScale]);

    useEffect(() => {
        if (mapData && svgRef.current) {
            const svg = d3.select(svgRef.current);
            const width = svg.node()?.clientWidth || 800;
            const height = svg.node()?.clientHeight || 600;

            const projection = d3.geoMercator().fitSize([width, height], mapData);
            const path = d3.geoPath().projection(projection);

            svg.selectAll('path').remove();

            svg.selectAll('path')
                .data(mapData.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => getColor(d.properties?.Bijstandsuitkering_10))
                .attr('stroke', 'black')
                .on('mouseover', handleMouseOver)
                .on('mousemove', handleMouseMove)
                .on('mouseout', handleMouseOut);

            const zoom = d3.zoom<SVGSVGElement, unknown>()
                .scaleExtent([0.5, 8])
                .on('zoom', (event) => {
                    svg.selectAll('path').attr('transform', event.transform.toString());
                });

            svg.call(zoom);
        }

    }, [getColor, mapData]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
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

export default Viz;
export { Filterlist, VizLegend }; 