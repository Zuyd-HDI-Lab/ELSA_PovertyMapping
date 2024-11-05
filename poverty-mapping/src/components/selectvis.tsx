import * as React from "react";
import { Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton, } from "@/components/ui/select";

interface SelectVisProps {
    options: string[];
    // selectedFilters: string[]
    // onChange: (filter: string) => void
}

const SelectVis: React.FC<SelectVisProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <Select>
            <SelectTrigger>
                <SelectValue>{selectedOption || "Select an option"}</SelectValue>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option} onSelect={() => handleSelect(option)} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export { SelectVis };