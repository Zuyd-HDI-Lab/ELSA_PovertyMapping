import React from 'react';
import { SelectVis, type Option } from '@/components/selectvis';
import { Filters, type Filter } from '@/components/filters';

interface SidebarProps {
    visOptions: Option[];
    selectedVis: string | null;
    setSelectedVis: (vis: string | null) => void;
    handleFilterChange: (filter: string, checked: boolean) => void;
    filterList: Filter[];
    selectedFilters: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
    visOptions, 
    selectedVis, 
    setSelectedVis, 
    handleFilterChange, 
    filterList,
    selectedFilters 
}) => {
    return (
        <div className="absolute top-4 right-4 w-1/4 p-4 bg-gray-300 rounded-lg shadow-lg z-10">
            <SelectVis options={visOptions} value={selectedVis} onChange={setSelectedVis} />
            <h1>Filters</h1>
            <Filters 
                filters={filterList} 
                selectedFilters={selectedFilters}
                onChange={handleFilterChange} 
            />
        </div>
    );
};

export default Sidebar;