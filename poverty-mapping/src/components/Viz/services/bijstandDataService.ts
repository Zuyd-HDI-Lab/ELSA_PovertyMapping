export interface AdditionalDataEntry {
    ID: number;
    WijkenEnBuurten: string;
    Perioden: string;
    Bijstandsuitkering_10: number;
}

// const getDataFileName = (period: string) => {
//     return `bijstand/cbs_bijstand_${period}.json`;
// };

// export const fetchAdditionalData = async (period: string): Promise<Record<string, AdditionalDataEntry>> => {
//     try {
//         const response = await fetch(getDataFileName(period));
//         const data = await response.json();
//         return data.value as Record<string, AdditionalDataEntry>;
//     } catch (error) {
//         console.error("Error loading additional data:", error);
//         throw error;
//     }
// }; 


const DATASET_MAPPING: Record<string, string> = {
    '2024': '86003NED',
    '2023': '85586NED',
    '2022': '85317NED',
    '2021': '85042NED',
    '2020': '84897NED',
    '2019': '84692NED',
    '2018': '84417NED',
    '2017': '83759NED',
    '2016': '83577NED',
    '2015': '83173NED',
    '2014': '83012NED',
    '2013': '83618NED'
};

const getDatasetForPeriod = (period: string): string => {
    const year = period.substring(0, 4);
    const dataset = DATASET_MAPPING[year];
    if (!dataset) {
        throw new Error(`No dataset available for year ${year}`);
    }
    return dataset;
};

interface ApiResponse {
    value: Record<string, AdditionalDataEntry>;
}

async function fetchData(url: string): Promise<ApiResponse> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

export const fetchAdditionalData = async (
    period: string, 
    retries = 3, 
    delay = 1000
): Promise<Record<string, AdditionalDataEntry>> => {
    const dataset = getDatasetForPeriod(period);
    const url = `https://opendata.cbs.nl/ODataFeed/odata/${dataset}/TypedDataSet?$filter=((Perioden eq '${period}')) and ((substring(WijkenEnBuurten,2,4) eq '0917'))&$select=ID,WijkenEnBuurten,Perioden,Bijstandsuitkering_10&$format=json`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetchData(url);
            return response.value;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            
            // If this was the last attempt, throw the error
            if (attempt === retries) {
                throw new Error(`Failed to fetch data after ${retries} attempts: ${error.message}`);
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Failed to fetch data after all retries');
}

