export const Filterlist = [
    { value: ">10", label: "Above 10%" },
];

export const VizLegend = {
    title: "Bijstandsuitkering",
    type: "gradient" as const,
    content: {
        stops: [
            { value: 0, color: 'green', label: '0%' },
            { value: 20, color: 'red', label: '20%' }
        ]
    }
}; 

export const PeriodenList = [
    "2023MM03",
    "2023MM06",
    "2023MM09",
    "2023MM12"
];

