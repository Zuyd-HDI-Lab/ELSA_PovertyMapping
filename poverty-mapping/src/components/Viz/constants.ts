export const Filterlist = [
    { value: ">10", label: "Above 10%" },
];

export const VizLegend = {
    title: "Bijstandsuitkering",
    type: "gradient" as const,
    content: {
        stops: [
            { value: 0, color: 'green', label: '0%' },
            { value: 15, color: 'red', label: '15%' }
        ]
    }
}; 