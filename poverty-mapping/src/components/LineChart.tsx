import React from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

interface LineChartProps {
    data: { date: string; value: number; series: string }[],
    width?: number,
    height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
    const spec: VisualizationSpec = {
        width: width || 800,
        height: height || 400,
        autosize: { type: "fit", contains: "padding" },
        mark: "line",
        encoding: {
            x: { 
                field: "date", 
                type: "temporal", 
                axis : { 
                    format: "%b %Y", 
                    title: "Date",
                }
            },
            y: { field: "value", type: "quantitative" },
            color: { 
                field: "series", 
                type: "nominal", 
            },
            tooltip: [
                { field: "date", type: "temporal" },
                { field: "value", type: "quantitative" },
                { field: "series", type: "nominal" },
            ],
        },
        data: { name: "table" },
    };

    const chartData = { table: data };

    return <VegaLite spec={spec} data={chartData} />;
};

export default LineChart;
