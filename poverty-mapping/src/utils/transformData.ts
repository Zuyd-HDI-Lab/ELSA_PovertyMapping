interface InputData {
    ID: number;
    WijkenEnBuurten: string;
    Perioden: string;
    Bijstandsuitkering_10: number;
    [key: string]: any;
}

export interface LineChartData {
    date: string;
    value: number;
    buurt: string;
}

let buurtMapping: Record<string, string> = {};

const loadBuurtMapping = async (): Promise<Record<string, string>> => {
    if (Object.keys(buurtMapping).length === 0) {
        const response = await fetch('/cbs_buurtcode_mapping.json');
        buurtMapping = await response.json();
        console.log("Buurt Mapping Loaded:", buurtMapping);
    }
    return buurtMapping;
};

export const transformData = async (data: InputData[]): Promise<LineChartData[]> => {

    const mapping = await loadBuurtMapping(); 

    const filteredData = data.filter(item => item.WijkenEnBuurten.startsWith('BU'));
    
    const ret = filteredData.map((item) => {
        const year = item.Perioden.slice(0, 4);
        const month = item.Perioden.slice(6, 8);
        
        const isoDate = `${year}-${month}-01`;

        const buurtNaam = mapping[item.WijkenEnBuurten] || item.WijkenEnBuurten;
        
        return {
            date: isoDate,
            value: item.Bijstandsuitkering_10,
            buurt: buurtNaam
        }
    });
    
    console.log(data)
    console.log(filteredData)
    console.log(ret)

    return ret
    // return  data.map((item) => {
    //     const year = item.Perioden.slice(0, 4); 
    //     const month = item.Perioden.slice(6, 8); 

    //     const isoDate = `${year}-${month}-01`;

    //     return {
    //         date: isoDate,
    //         value: item.Bijstandsuitkering_10,
    //         series: item.WijkenEnBuurten
    //     }
    // });
};

export const transformData2 = async (data: InputData[]): Promise<LineChartData[]> => {

    const mapping = await loadBuurtMapping(); 

    const filteredData = data.filter(item => item.WijkenEnBuurten.startsWith('BU'));
    
    const ret = filteredData.map((item) => {
        const year = item.Perioden.slice(0, 4);
        const month = item.Perioden.slice(6, 8);
        
        const isoDate = `${year}-${month}-01`;

        const buurtNaam = mapping[item.WijkenEnBuurten] || item.WijkenEnBuurten;
        
        return {
            date: isoDate,
            value: item.Werkloosheidsuitkering_9,
            buurt: buurtNaam
        }
    });
    
    console.log(data)
    console.log(filteredData)
    console.log(ret)

    return ret
};