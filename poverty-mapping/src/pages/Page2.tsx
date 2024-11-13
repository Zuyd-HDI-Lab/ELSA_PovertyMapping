import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/filters";
import { SelectVis } from "@/components/selectvis";
import React, { useState, useEffect } from "react";
import Viz from "@/components/Viz";

const Page2: React.FC = () => {

    const [selectedVis, setSelectedVis] = useState<string | null>(null);
    const visOptions = ['Viz'];
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    useEffect(() => {
        console.log("Selected Filters:", selectedFilters);
    }, [selectedFilters]);

    const handleSearch = (query: string) => {
        console.log("Search Query:", query);
        // Search on map, probably highlight
    };

    const handleFilterChange = (filter: string, checked: boolean) => {
        setSelectedFilters((prev) => 
            checked ? [...prev, filter] : prev.filter((f) => f !== filter)
        );
    };

    return (
        <div className="h-screen relative">
            <div className="absolute inset-0 z-0 overflow-hidden">
                {selectedVis === 'Viz' && <Viz selectedFilters={selectedFilters} />}
            </div>
            
            <div className="absolute top-4 left-4 z-10">
                <SearchBar onSearch={handleSearch} />
            </div>

            <div className="absolute bottom-4 right-4 w-full max-w-xs z-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Legend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Legend content</p>
                    </CardContent>
                </Card>
            </div>

            <div className="absolute bottom-4 left-4 w-full max-w-xs z-10">
                <Slider defaultValue={[33]} max={100} step={1} />
            </div>

            <div className="absolute top-4 right-4 w-1/4 p-4 bg-gray-300 rounded-lg shadow-lg z-10">
                <SelectVis options={visOptions} onChange={setSelectedVis} />
                <h1>Filters</h1>
                <Filters filters={[">10", "Filter 2", "Filter 3"]} onChange={handleFilterChange} />
            </div>
        </div>
    );
};

export default Page2;
