import React from "react";
import TimeChartPop from "@/components/TimeChartPop";

const TimeChartPage: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <TimeChartPop className="w-[90vw] h-[90vh]" />
        </div>
    );
};

export default TimeChartPage;