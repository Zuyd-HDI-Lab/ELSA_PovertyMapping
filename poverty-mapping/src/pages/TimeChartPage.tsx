import React from "react";
import LineChart from "@/components/LineChart";

const lineData = [
        { date: '2023-01-01', value: 10 },
        { date: '2023-02-01', value: 15 },
        { date: '2023-03-01', value: 7 },
        { date: '2023-04-01', value: 20 },
];

const TimeChartPage: React.FC = () => {
    return (
        <div>
            <LineChart data={lineData} />
        </div>
    );
};

export default TimeChartPage;
