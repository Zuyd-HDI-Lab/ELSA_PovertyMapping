import { useMemo, useCallback } from 'react';
import * as d3 from 'd3';

export const useColorScale = (selectedFilters: string[]) => {
    const colorScale = useMemo(() =>
        d3.scaleLinear<string>()
            .domain([0, 20])
            .range(['green', 'red']),
        []
    );

    const getColor = useCallback((value: number | null | undefined) => {
        if (value === null || value === undefined) {
            return 'darkgray';
        }

        if (selectedFilters.includes(">10")) {
            return value > 10 ? colorScale(value) : 'gray';
        }

        return colorScale(value);
    }, [selectedFilters, colorScale]);

    return getColor;
}; 