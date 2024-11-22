export interface AdditionalDataEntry {
    ID: number;
    WijkenEnBuurten: string;
    Perioden: string;
    Werkloosheidsuitkering_5: number;
    Bijstandsuitkering_6: number;
    Arbeidsongeschiktheidsuitkering_7: number;
    AOWUitkering_8: number;
    Werkloosheidsuitkering_9: number;
    Bijstandsuitkering_10: number;
    Arbeidsongeschiktheidsuitkering_11: number;
    AOWUitkering_12: number;
    InwonersVanaf15Jaar_13: number;
    InwonersVanaf15JrTotAOWLeeftijd_14: number;
    InwonersVanafDeAOWLeeftijd_15: number;
}

// const DATASET_MAPPING: Record<string, Record<string, string>> = {
//     bijstand: {
//         '2024': '86003NED',
//         '2023': '85586NED',
//         '2022': '85317NED',
//         '2021': '85042NED',
//         '2020': '84897NED',
//         '2019': '84692NED',
//         '2018': '84417NED',
//         '2017': '83759NED',
//         '2016': '83577NED',
//         '2015': '83173NED',
//         '2014': '83012NED',
//         '2013': '83618NED'
//         // ... rest of the years from bijstandDataService
//     },
//     // inkomen: {
//     //     '2024': '87001NED',
//     //     '2023': '86587NED',
//     // },
//     // populatie: {
//     //     '2024': '88001NED',
//     //     '2023': '87587NED',
//     // }
// };

// const getDatasetForPeriod = (period: string, dataset: string): string => {
//     const year = period.substring(0, 4);
//     const mapping = DATASET_MAPPING[dataset];
//     if (!mapping || !mapping[year]) {
//         throw new Error(`No dataset available for year ${year} and dataset ${dataset}`);
//     }
//     return mapping[year];
// };

// export const fetchAdditionalData = async (
//     period: string,
//     dataset: string,
//     retries = 3,
//     delay = 1000
// ): Promise<Record<string, AdditionalDataEntry>> => {
//     const datasetId = getDatasetForPeriod(period, dataset);
//     const url = `https://opendata.cbs.nl/ODataFeed/odata/${datasetId}/TypedDataSet?$filter=((Perioden eq '${period}')) and ((substring(WijkenEnBuurten,2,4) eq '0917'))&$select=ID,WijkenEnBuurten,Perioden,Bijstandsuitkering_10&$format=json`;

//     for (let attempt = 1; attempt <= retries; attempt++) {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             return data.value;
//         } catch (error) {
//             if (attempt === retries) throw error;
//             await new Promise(resolve => setTimeout(resolve, delay));
//         }
//     }
//     throw new Error('Failed to fetch data after all retries');
// }; 


import dataUrl from '/cbs_uitkering_combined.json?url'

export async function fetchAdditionalData(): Promise<AdditionalDataEntry[]> {
    const response = await fetch(dataUrl);
    const data = await response.json();
    return data.value as AdditionalDataEntry[];
}
