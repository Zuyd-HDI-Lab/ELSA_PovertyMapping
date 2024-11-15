import React, { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import Viz, { Filterlist as VizFilterlist, VizLegend } from "@/components/Viz";
import Sidebar from "@/components/Sidebar";
import Legend from "@/components/Legend";

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
        // or center and zoom
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

    const getLegendProps = () => {
        switch (selectedVis) {
            case 'Viz':
                return VizLegend;
            default:
                return null;
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
                {getLegendProps() && <Legend {...getLegendProps()!} />}
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
