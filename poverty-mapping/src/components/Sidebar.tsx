import React from 'react';
import { SelectVis, type Option } from '@/components/selectvis';
import { Filters, type Filter } from '@/components/filters';
import { SelectPerioden } from '@/components/selectperioden';
import { SelectDataset } from '@/components/SelectDataset';

interface SidebarProps {
    visOptions: Option[];
    selectedVis: string | null;
    setSelectedVis: (vis: string | null) => void;
    handleFilterChange: (filter: string, checked: boolean) => void;
    filterList: Filter[];
    selectedFilters: string[];
    PeriodenList: string[];
    selectedPerioden: string | null;
    setSelectedPerioden: (perioden: string | null) => void;
    datasetOptions?: { value: string; label: string; }[];
    selectedDataset: string | null;
    setSelectedDataset: (dataset: string | null) => void;
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
    setSelectedPerioden,
    datasetOptions,
    selectedDataset,
    setSelectedDataset,
}) => {
    return (
        <div className="absolute top-4 right-4 w-64 bg-white p-4 rounded shadow-lg z-10">
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Visualization</h3>
                <SelectVis options={visOptions} value={selectedVis || ''} onChange={setSelectedVis} />
            </div>

            {selectedVis && (
                <>
                    {datasetOptions && datasetOptions.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-base mb-2">Dataset</h3>
                            <SelectDataset
                                options={datasetOptions}
                                value={selectedDataset}
                                onChange={setSelectedDataset}
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <h3 className="text-base mb-2">Perioden</h3>
                        <SelectPerioden 
                            options={PeriodenList} 
                            value={selectedPerioden} 
                            onChange={setSelectedPerioden} 
                        />
                    </div>

                    <div className="mb-4">
                        <h3 className="text-base mb-2">Filters</h3>
                        <Filters 
                            filters={filterList} 
                            selectedFilters={selectedFilters}
                            onChange={handleFilterChange} 
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;