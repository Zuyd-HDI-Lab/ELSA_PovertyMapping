import { useState, useEffect } from 'react';
import { FeatureCollection } from 'geojson';
import { AdditionalDataEntry } from '../services/bijstandDataService';

export const useProcessMapData = (
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