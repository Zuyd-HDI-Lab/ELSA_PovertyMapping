import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Filter {
    value: string;
    label: string;
}

interface FiltersProps {
    filters: Filter[];
    selectedFilters: string[];
    onChange: (filter: string, checked: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, selectedFilters, onChange }) => {
    return (
        <div className="space-y-2">
            {filters.map((filter) => (
                <div key={filter.value} className="flex items-center space-x-2">
                    <Checkbox
                        id={filter.value}
                        checked={selectedFilters.includes(filter.value)}
                        onCheckedChange={(checked) => onChange(filter.value, Boolean(checked))}
                    />
                    <label htmlFor={filter.value}>
                        {filter.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export { Filters };
export type { Filter };