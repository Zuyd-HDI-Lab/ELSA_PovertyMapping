import React from 'react';
import { SelectVis } from '@/components/selectvis';
import { Filters } from '@/components/filters';

interface SidebarProps {
    visOptions: string[];
    setSelectedVis: (vis: string | null) => void;
    handleFilterChange: (filter: string, checked: boolean) => void;
    filterList: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ visOptions, setSelectedVis, handleFilterChange, filterList }) => {
    return (
        <div className="absolute top-4 right-4 w-1/4 p-4 bg-gray-300 rounded-lg shadow-lg z-10">
            <SelectVis options={visOptions} onChange={setSelectedVis} />
            <h1>Filters</h1>
            <Filters filters={filterList} onChange={handleFilterChange} />
        </div>
    );
};

export default Sidebar;