import React from "react";
import { VegaLite, VisualizationSpec} from "react-vega";

interface LineChartProps {
    data: {date: string, value: number}[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const spec: VisualizationSpec = {
        width: 1000,
        height: 500,
        mark: "line",
        encoding: {
            x: { field: "date", type: "temporal" },
            y: { field: "value", type: "quantitative" },
        },
        data: { name: "table" },
    };

    const chartData = { table: data };

    return <VegaLite spec={spec} data={chartData} />;
};

export default LineChart;
