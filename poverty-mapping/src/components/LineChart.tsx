import React, { useRef, useEffect } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

interface LineChartProps {
    data: { date: string; value: number; buurt: string }[];
    className?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, className }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<any>(null);

    const spec: VisualizationSpec = {
        width: "container",
        height: "container",
        autosize: { type: "fit", contains: "padding", resize: true },
        mark: "line",
        encoding: {
            x: {
                field: "date",
                type: "temporal",
                axis: {
                    format: "%b %Y",
                    title: "Date",
                },
            },
            y: { field: "value", type: "quantitative" },
            color: { field: "buurt", type: "nominal" },
            tooltip: [
                { field: "date", type: "temporal" },
                { field: "value", type: "quantitative" },
                { field: "buurt", type: "nominal" },
            ],
        },
        data: { name: "table" },
    };

    const chartData = { table: data };

    const handleNewView = (view: any) => {
        viewRef.current = view;
    };

    useEffect(() => {
        if (!containerRef.current || !viewRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            console.log('ResizeObserver triggered');
            requestAnimationFrame(() => {
                viewRef.current.resize().runAsync();
            });
        });

        resizeObserver.observe(containerRef.current);

        // Fallback: Force a resize on window resize events
        const handleWindowResize = () => {
            requestAnimationFrame(() => {
                if (viewRef.current) {
                    viewRef.current.resize().runAsync();
                }
            });
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [viewRef]);

    return (
        <div ref={containerRef} className={`w-full h-full ${className ?? ""}`}>
            <VegaLite
                spec={spec}
                data={chartData}
                className="w-full h-full"
                onNewView={handleNewView}
            />
        </div>
    );
};

export default LineChart;
