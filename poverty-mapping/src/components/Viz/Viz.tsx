import React, { useRef, useState, useEffect } from 'react';
import useMapDataLoader from '../MapDataLoader';
import { Filterlist, VizLegend, PeriodenList } from './constants';
import { AdditionalDataEntry, fetchAdditionalData } from './services/bijstandDataService';
import MapTooltip from './components/MapTooltip';
import { useMapRenderer, useProcessMapData, useColorScale, useZoom, useTooltip } from './hooks';

interface VizProps {
    selectedFilters: string[];
    selectedPerioden: string | null;
}

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