import React from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

interface LineChartProps {
    data: { date: string; value: number; buurt: string }[],
    className?: string,
}

const LineChart: React.FC<LineChartProps> = ({ data, className }) => {
    const spec: VisualizationSpec = {
        width: "container",
        height: "container",
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
                field: "buurt", 
                type: "nominal", 
            },
            tooltip: [
                { field: "date", type: "temporal" },
                { field: "value", type: "quantitative" },
                { field: "buurt", type: "nominal" },
            ],
        },
        data: { name: "table" },
    };

    const chartData = { table: data };

    return <VegaLite spec={spec} data={chartData} className={className}/>;
};

export default LineChart;
