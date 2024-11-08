import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/filters";
import { SelectVis } from "@/components/selectvis";
import Map from "@/components/Map"
import useDataLoader from "@/components/DataLoader";
import useMapDataLoader from "@/components/MapDataLoader";
import React, { useState } from "react";
import Vis1 from "@/components/Vis1";
import Vis2 from "@/components/Vis2";

const Page2: React.FC = () => {
    const dataLocalPath = 'data.csv';
    const mapLocalPath = 'heerlen_buurten_2023_formatted.json';
    const mapData = useMapDataLoader(mapLocalPath);
    const data = useDataLoader(dataLocalPath);

    const [selectedVis, setSelectedVis] = useState<string | null>(null);
    const visOptions = ['Vis1', 'Vis2'];

    console.log('Map Data:', mapData); // debug line
    console.log('Vis Data:', data); // debug line

    const handleSearch = (query: string) => {
        console.log("Search Query:", query);
        // Search on map, probably highlight
    };
    return (
        <div className="h-screen relative">
            <div className="absolute inset-0 z-0 overflow-hidden">
                {mapData && <Map mapData={mapData} />}
                {data.length > 0 && selectedVis === 'Vis1' && <Vis1 mapData={mapData} />}
                {data.length > 0 && selectedVis === 'Vis2' && <Vis2 mapData={mapData} />}
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
                <Filters filters={["Filter 1", "Filter 2", "Filter 3"]} />
            </div>
        </div>
    );
};

export default Page2;
