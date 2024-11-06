import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/filters";
import { SelectVis } from "@/components/selectvis";
import Map from "@/components/Map"
import useDataLoader from "@/components/DataLoader";
import useMapDataLoader from "@/components/MapDataLoader";
import DataVisualizer from "@/components/DataVisualizer";
import React from "react";

const Home: React.FC = () => {
    const dataLocalPath = 'data.csv';
    const mapLocalPath = 'heerlen_buurten_2023_formatted.json';
    const mapData = useMapDataLoader(mapLocalPath);
    const data = useDataLoader(dataLocalPath);

    console.log('Map Data:', mapData); // debug line
    console.log('Vis Data:', data); // debug line

    const handleSearch = (query: string) => {
        console.log("Search Query:", query);
        // Search on map, probably highlight
    };
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
                <div className="relative w-3/4 p-4 bg-gray-200 flex flex-col justify-between">
                    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                        {mapData && <Map mapData={mapData} />}
                        {data.length > 0 && <DataVisualizer data={data} mapData={mapData} />}
                    </div>
                    <div className="relative z-10">
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

                    <div className="relative z-10">
                        <Slider defaultValue={[33]} max={100} step={1} />
                    </div>
                </div>

                <div className="w-1/4 p-4 bg-gray-300">
                    <SelectVis options={["Option 1", "Option 2", "Option 3"]} />
                    <h1>Filters</h1>
                    <Filters filters={["Filter 1", "Filter 2", "Filter 3"]} />
                </div>
            </div>

            <div className="h-1/3 p-4 bg-gray-400">
                <h2 className="text-lg font-bold mb-2">Placeholder Header</h2>
                <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
                    semper leo. Morbi vehicula, urna ut egestas dictum, sapien nisi
                    tincidunt eros, non efficitur lacus justo et magna. Nulla facilisi.
                    Sed gravida nisl non purus elementum, eu accumsan massa vehicula. Sed
                    eget nibh vitae justo sagittis ultricies. Aenean id felis sit amet
                    justo convallis dictum. Curabitur eget nunc eu magna egestas auctor ac
                    in urna. Proin vitae velit in justo tincidunt fermentum. Suspendisse
                    potenti. Integer in eros non nisi vehicula consectetur non eu libero.
                    Mauris quis massa vel nunc consequat bibendum. Suspendisse sit amet
                    urna ut nisi dapibus gravida.
                </p>
            </div>
        </div>
    );
};

export default Home;
