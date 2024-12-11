import React, { useState, useEffect } from "react";
import LineChart from "@/components/LineChart";
import { Checkbox } from "@/components/ui/checkbox";
import { transformData, LineChartData } from "@/utils/transformData";
import { fetchAdditionalData } from "@/components/Choropleth/services/dataService";

interface TimeChartProps {
    className?: string;
}

const TimeChart: React.FC<TimeChartProps> = ({ className }) => {
    const [lineData, setLineData] = useState<LineChartData[]>([]);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAdditionalData();
            const transformedData = transformData(data);
            setLineData(transformedData);
            // const seriesOptions = Array.from(new Set(transformedData.map((d) => d.series)));
            // setSelectedSeries(seriesOptions);
        };
        fetchData();
    }, []);

    const seriesOptions = Array.from(new Set(lineData.map((d) => d.buurt)));

    const filteredData = lineData.filter((d) =>
        selectedSeries.includes(d.buurt)
    );

    const handleSeriesToggle = (series: string) => {
        setSelectedSeries((prev) =>
            prev.includes(series)
                ? prev.filter((s) => s !== series)
                : [...prev, series]
        );
    };

    return (
        <div className={`flex h-full ${className || ""}`}>
            {/* Chart Section */}
            <div className="flex-1 min-w-0 h-full">
                <LineChart data={filteredData} className="w-full h-full" />
            </div>

            {/* Series Selection Section */}
            <div className="flex-shrink-0 w-1/4 max-w-sm p-4 bg-gray-100 overflow-y-auto">
                {seriesOptions.map((series) => (
                    <div key={series} className="flex items-center gap-2">
                        <Checkbox
                            checked={selectedSeries.includes(series)}
                            onCheckedChange={() => handleSeriesToggle(series)}
                        />
                        <label className="text-sm font-medium">Series {series}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeChart;
