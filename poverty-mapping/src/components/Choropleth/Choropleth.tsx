import React, { useRef, useState, useEffect } from 'react';
import useMapDataLoader from '../MapDataLoader';
import { Filterlist, ChoroplethLegend, PeriodenList, DatasetOptions } from './constants';
import { AdditionalDataEntry, fetchAdditionalData } from './services/dataService';
import MapTooltip from './components/MapTooltip';
import { useMapRenderer, useProcessMapData, useColorScale, useZoom, useTooltip } from './hooks';

interface ChoroplethProps {
    selectedFilters: string[];
    selectedPerioden: string | null;
    selectedDataset: string | null;
}

const Choropleth: React.FC<ChoroplethProps> = ({ selectedFilters, selectedPerioden, selectedDataset }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const mapData = useMapDataLoader('/heerlen_buurten_2023_formatted.json');
    const [additionalData, setAdditionalData] = useState<AdditionalDataEntry[] | null>(null);
    const { tooltipState, handlers } = useTooltip(selectedDataset);

    const getColor = useColorScale(selectedFilters);
    const processedMapData = useProcessMapData(mapData, additionalData, selectedPerioden, selectedDataset);

    useEffect(() => {
        if (selectedPerioden && selectedDataset) {
            fetchAdditionalData()
                .then(setAdditionalData)
                .catch(error => console.error("Error loading additional data:", error));
        }
    }, [selectedPerioden, selectedDataset]);

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

export default Choropleth;
export { Filterlist, ChoroplethLegend, PeriodenList, DatasetOptions }; 