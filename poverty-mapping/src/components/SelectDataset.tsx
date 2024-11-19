import * as React from "react";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface DatasetOption {
    value: string;
    label: string;
}

interface SelectDatasetProps {
    options: DatasetOption[];
    value: string | null;
    onChange: (dataset: string) => void;
}

const SelectDataset: React.FC<SelectDatasetProps> = ({ options, value, onChange }) => {
    return (
        <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a dataset" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export { SelectDataset }; 