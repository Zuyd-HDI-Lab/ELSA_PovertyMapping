export interface AdditionalDataEntry {
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

const getDataFileName = (period: string) => {
    return `bijstand/cbs_bijstand_${period}.json`;
};

export const fetchAdditionalData = async (period: string): Promise<Record<string, AdditionalDataEntry>> => {
    try {
        const response = await fetch(getDataFileName(period));
        const data = await response.json();
        return data.value as Record<string, AdditionalDataEntry>;
    } catch (error) {
        console.error("Error loading additional data:", error);
        throw error;
    }
}; 