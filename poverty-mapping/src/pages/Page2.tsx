import React, { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Viz, { Filterlist as VizFilterlist } from "@/components/Viz";
import Sidebar from "@/components/Sidebar";

const Page2: React.FC = () => {
    const [selectedVis, setSelectedVis] = useState<string | null>(null);
    const visOptions = [
        { value: 'Viz', label: 'Visualization 1' },
    ];
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    useEffect(() => {
        console.log("Selected Filters:", selectedFilters);
    }, [selectedFilters]);

    const handleSearch = useCallback((query: string) => {
        console.log("Search Query:", query);
        // Search on map, probably highlight
        // or center aan zoom
    }, []);

    const handleFilterChange = useCallback((filter: string, checked: boolean) => {
        setSelectedFilters((prev) => 
            checked ? [...prev, filter] : prev.filter((f) => f !== filter)
        );
    }, []);

    const getFilterList = () => {
        switch (selectedVis) {
            case 'Viz':
                return VizFilterlist;
            default:
                return [];
        }
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

            <Sidebar 
                visOptions={visOptions} 
                selectedVis={selectedVis}
                setSelectedVis={setSelectedVis} 
                handleFilterChange={handleFilterChange} 
                filterList={getFilterList()}
                selectedFilters={selectedFilters}
            />
        </div>
    );
};

export default Page2;
