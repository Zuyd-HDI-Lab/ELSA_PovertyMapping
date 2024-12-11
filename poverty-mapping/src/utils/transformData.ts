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

export const transformData = (data: InputData[]): LineChartData[] => {
    const filteredData = data.filter(item => item.WijkenEnBuurten.startsWith('BU'));
    
    const ret = filteredData.map((item) => {
        const year = item.Perioden.slice(0, 4);
        const month = item.Perioden.slice(6, 8);
        
        const isoDate = `${year}-${month}-01`;
        
        return {
            date: isoDate,
            value: item.Bijstandsuitkering_10,
            buurt: item.WijkenEnBuurten
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
