import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersProps {
    filters: string[];
    // selectedFilters: string[]
    // onChange: (filter: string) => void
}

const Filters: React.FC<FiltersProps> = ({ filters }) => {
    const [checkedFilters, setCheckedFilters] = React.useState<
        Record<string, boolean>
    >(() => Object.fromEntries(filters.map((filter) => [filter, false])));

    const handleToggle = (filter: string) => {
        setCheckedFilters((prev) => ({
            ...prev,
            [filter]: !prev[filter],
        }));
    };

    return (
        <div className="space-y-2">
            {filters.map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                    <Checkbox
                        checked={checkedFilters[filter]}
                        onCheckedChange={() => handleToggle(filter)}
                    />
                    <label >
                        {filter}
                    </label>
                </div>
            ))}
        </div>
    );
};

export { Filters };