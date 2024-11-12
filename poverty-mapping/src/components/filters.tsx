import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersProps {
    filters: string[];
    onChange: (filter: string, checked: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
    return (
        <div className="space-y-2">
            {filters.map((filter) => (
                <div key={filter} className="flex items-center space-x-2">
                    <Checkbox
                        id={filter}
                        onCheckedChange={(checked) => onChange(filter, Boolean(checked))}
                    />
                    <label htmlFor={filter}>
                        {filter}
                    </label>
                </div>
            ))}
        </div>
    );
};

export { Filters };