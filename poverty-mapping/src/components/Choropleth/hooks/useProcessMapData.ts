import { useState, useEffect } from 'react';
import { FeatureCollection } from 'geojson';
import { AdditionalDataEntry } from '../services/dataService';
import { DatasetOptions } from '../constants';

export const useProcessMapData = (
    mapData: FeatureCollection | null,
    additionalData: AdditionalDataEntry[] | null,
    selectedPerioden: string | null,
    selectedDataset: string | null
) => {
    const [processedMapData, setProcessedMapData] = useState<FeatureCollection | null>(null);

    useEffect(() => {
        if (mapData) {
            const updatedMapData = {
                ...mapData,
                features: mapData.features.map((feature) => {
                    const matchingData = selectedPerioden && additionalData ?
                        Object.values(additionalData).find(
                            (item) => item.WijkenEnBuurten.trim() === feature.properties?.["CBS-buurtcode"] &&
                                item.Perioden === selectedPerioden
                        ) : null;

                    // Create a dynamic object with all dataset values
                    const datasetProperties = DatasetOptions.reduce((acc, dataset) => ({
                        ...acc,
                        [dataset.value]: matchingData?.[dataset.value as keyof AdditionalDataEntry] ?? null
                    }), {});

                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            ...datasetProperties,
                            // Add the selected dataset value as dataValue for rendering
                            dataValue: selectedDataset && matchingData ? 
                                matchingData[selectedDataset as keyof AdditionalDataEntry] ?? null : null
                        }
                    };
                })
            };
            setProcessedMapData(updatedMapData);
        }
    }, [mapData, additionalData, selectedPerioden, selectedDataset]);

    return processedMapData;
}; 
