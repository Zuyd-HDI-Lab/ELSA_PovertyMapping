import React from "react";
import LineChart from "@/components/LineChart";

const lineData = [
        { date: '2023-01-01', value: 10, series: 'A' },
        { date: '2023-02-01', value: 15, series: 'A' },
        { date: '2023-03-01', value: 7, series: 'A' },
        { date: '2023-04-01', value: 20, series: 'A' },
        { date: '2023-01-01', value: 5, series: 'B' },
        { date: '2023-02-01', value: 10, series: 'B' },
        { date: '2023-03-01', value: 17, series: 'B' },
        { date: '2023-04-01', value: 30, series: 'B' },
];

const TimeChartPage: React.FC = () => {
    return (
        <div>
            <LineChart data={lineData} />
        </div>
    );
};

export default TimeChartPage;
