import React, { useState } from "react";
import LineChart from "@/components/LineChart";
import { Checkbox } from "@/components/ui/checkbox";

const lineData = [
    { date: "2023-01-01", value: 10, series: "A" },
    { date: "2023-02-01", value: 15, series: "A" },
    { date: "2023-03-01", value: 7, series: "A" },
    { date: "2023-04-01", value: 20, series: "A" },
    { date: "2023-01-01", value: 5, series: "B" },
    { date: "2023-02-01", value: 10, series: "B" },
    { date: "2023-03-01", value: 17, series: "B" },
    { date: "2023-04-01", value: 30, series: "B" },
    { date: "2023-01-01", value: 3, series: "C" },
    { date: "2023-02-01", value: 8, series: "C" },
    { date: "2023-03-01", value: 12, series: "C" },
    { date: "2023-04-01", value: 15, series: "C" },
];

const seriesOptions = Array.from(new Set(lineData.map((d) => d.series)));

const TimeChartPage: React.FC = () => {
    const [selectedSeries, setSelectedSeries] = useState<string[]>(seriesOptions);

    const filteredData = lineData.filter((d) =>
        selectedSeries.includes(d.series)
    );

    const handleSeriesToggle = (series: string) => {
        setSelectedSeries((prev) =>
            prev.includes(series)
                ? prev.filter((s) => s !== series)
                : [...prev, series]
        );
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
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
            <LineChart data={filteredData} series={seriesOptions} />
        </div>
    );
};

export default TimeChartPage;