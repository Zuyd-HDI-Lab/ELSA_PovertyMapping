import { LegendContent } from '../Legend';

export const Filterlist = [
    { value: ">10", label: "Above 10%" },
    { value: "filter2", label: "Filter 2" },
    { value: "filter3", label: "Filter 3" }
];

export const VizLegend: LegendContent = {
    title: "Bijstandsuitkering",
    items: [
        { color: 'darkgray', label: 'No data' },
        { color: 'green', label: '0%' },
        { color: 'red', label: '15%' },
    ]
}; 