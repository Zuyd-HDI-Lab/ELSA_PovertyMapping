import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SearchBar } from "@/components/searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filters } from "@/components/filters";
import { SelectVis } from "@/components/selectvis";

const Home = () => {
    const handleSearch = (query: string) => {
        console.log("Search Query:", query);
        // Search on map, probably highlight
    };
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
                <div className="relative w-3/4 p-4 bg-gray-200 flex flex-col justify-between">
                    <SearchBar onSearch={handleSearch} />
                    <p>Map</p>

                    <div className="absolute bottom-4 right-4 w-full max-w-xs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Legend</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Legend content</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Slider defaultValue={[33]} max={100} step={1} />
                </div>

                <div className="w-1/4 p-4 bg-gray-300">
                    {/* <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}
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
