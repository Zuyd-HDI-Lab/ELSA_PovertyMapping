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
    series: string;
}

export const transformData = (data: InputData[]): LineChartData[] => {
    const ret = data.map((item) => {
        const year = item.Perioden.slice(0, 4);
        const month = item.Perioden.slice(6, 8);

        const isoDate = `${year}-${month}-01`;

        return {
            date: isoDate,
            value: item.Bijstandsuitkering_10,
            series: item.WijkenEnBuurten
        }
    });

    console.log(data)
    console.log(ret)

    return  data.map((item) => {
        const year = item.Perioden.slice(0, 4); 
        const month = item.Perioden.slice(6, 8); 

        const isoDate = `${year}-${month}-01`;

        return {
            date: isoDate,
            value: item.Bijstandsuitkering_10,
            series: item.WijkenEnBuurten
        }
    });
};
