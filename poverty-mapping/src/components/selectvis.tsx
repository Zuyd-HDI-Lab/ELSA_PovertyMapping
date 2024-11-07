import * as React from "react";
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

interface SelectVisProps {
    options: string[];
    onChange: (option: string) => void;
}

const SelectVis: React.FC<SelectVisProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onChange(option);
    };

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
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

export { SelectVis };