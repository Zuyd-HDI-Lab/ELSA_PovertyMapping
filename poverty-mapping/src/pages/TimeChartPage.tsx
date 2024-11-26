import React from "react";
import LineChart from "@/components/LineChart";

const data = [
    { date: "2024-11-20", value: 10 },
    { date: "2024-11-21", value: 15 },
    { date: "2024-11-22", value: 20 },
    { date: "2024-11-23", value: 25 },
    { date: "2024-11-24", value: 30 },
];

const TimeChartPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Line Chart</h1>
            <div className="border border-gray-300 rounded-lg p-4">
                <LineChart data={data} width={600} height={400} />
            </div>
        </div>
    );
};

export default TimeChartPage;
