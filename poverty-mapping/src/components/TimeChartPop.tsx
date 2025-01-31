import React, { useState, useEffect } from "react";
import LineChart from "@/components/LineChart";
import { Checkbox } from "@/components/ui/checkbox";
import { transformData, LineChartData } from "@/utils/transformData";
import { fetchAdditionalData } from "@/components/Choropleth/services/dataService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface TimeChartProps {
    className?: string;
}

const TimeChart: React.FC<TimeChartProps> = ({ className }) => {
    const [lineData, setLineData] = useState<LineChartData[]>([]);
    const [selectedBuurt, setSelectedBuurt] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAdditionalData();
            const transformedData = await transformData(data);
            setLineData(transformedData);
            // const seriesOptions = Array.from(new Set(transformedData.map((d) => d.buurt)));
            // setSelectedSeries(seriesOptions);
        };
        fetchData();
    }, []);

    const seriesOptions = Array.from(new Set(lineData.map((d) => d.buurt)));

    const filteredData = lineData.filter((d) =>
        selectedBuurt.includes(d.buurt)
    );

    const handleSeriesToggle = (buurt: string) => {
        setSelectedBuurt((prev) =>
            prev.includes(buurt)
                ? prev.filter((s) => s !== buurt)
                : [...prev, buurt]
        );
    };

    return (

        <Card className={`${className} flex flex-col`}>
            <CardHeader>
                <CardTitle>Bijstandsuitkering</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>

            {/* Wrap CardContent in a flex-grow container with min-h-0 */}
            <CardContent className="flex-grow flex w-full p-4 min-h-0">
                {/* Chart Section */}
                <div className="flex-grow p-4 min-h-0 min-w-0">
                    <LineChart data={filteredData} className="w-full h-full" />
                </div>

                {/* buurt Selection Section */}
                <div className="flex-shrink min-w-0 w-1/4 max-w-sm p-4 bg-gray-100 overflow-y-auto">
                    {seriesOptions.map((buurt) => (
                        <div key={buurt} className="flex items-center gap-2 mb-2">
                            <Checkbox
                                checked={selectedBuurt.includes(buurt)}
                                onCheckedChange={() => handleSeriesToggle(buurt)}
                            />
                            <label className="text-sm font-medium">{buurt}</label>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter>
                <p>https://www.cbs.nl/nl-nl/cijfers/detail/85586NED</p>
            </CardFooter>
        </Card>




    );
};

export default TimeChart;
