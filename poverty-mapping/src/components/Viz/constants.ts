import { LegendContent } from '../Legend';

export const Filterlist = [
    { value: ">10", label: "Above 10%" },
];

export const VizLegend: LegendContent = {
    title: "Bijstandsuitkering",
    items: [
        { color: 'darkgray', label: 'No data' },
        { color: 'green', label: '0%' },
        { color: 'red', label: '15%' },
    ]
}; 