import React from 'react';
import { SelectVis, type Option } from '@/components/selectvis';
import { Filters, type Filter } from '@/components/filters';
import { SelectPerioden } from '@/components/selectperioden';

interface SidebarProps {
    visOptions: Option[];
    selectedVis: string | null;
    setSelectedVis: (vis: string | null) => void;
    handleFilterChange: (filter: string, checked: boolean) => void;
    filterList: Filter[];
    selectedFilters: string[];
    PeriodenList: string[];
    selectedPerioden: string;
    setSelectedPerioden: (perioden: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    visOptions, 
    selectedVis, 
    setSelectedVis, 
    handleFilterChange, 
    filterList,
    selectedFilters,
    PeriodenList,
    selectedPerioden,
    setSelectedPerioden
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
            <h1>Perioden</h1>
            <SelectPerioden 
                options={PeriodenList} 
                value={selectedPerioden} 
                onChange={setSelectedPerioden} 
            />
        </div>
    );
};

export default Sidebar;