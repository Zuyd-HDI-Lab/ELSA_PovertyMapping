import * as React from "react";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface SelectPeriodenProps {
    options: string[];
    value: string | null;
    onChange: (perioden: string) => void;
}

const SelectPerioden: React.FC<SelectPeriodenProps> = ({ options, value, onChange }) => {
    return (
        <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a period" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export { SelectPerioden }; 