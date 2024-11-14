import * as React from "react";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface Option {
    value: string;
    label: string;
}

interface SelectVisProps {
    options: Option[];
    value: string | null;
    onChange: (option: string) => void;
}

const SelectVis: React.FC<SelectVisProps> = ({ options, value, onChange }) => {
    return (
        <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
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

export { SelectVis };
export type { Option };