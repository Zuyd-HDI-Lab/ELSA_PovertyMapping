import { useState, useCallback } from 'react';
import { Feature } from 'geojson';

interface TooltipState {
    show: boolean;
    content: string;
    position: {
        x: number;
        y: number;
    };
}

export interface TooltipHandlers {
    handleMouseOver: (event: React.MouseEvent<SVGPathElement, MouseEvent>, d: Feature) => void;
    handleMouseMove: (event: MouseEvent) => void;
    handleMouseOut: () => void;
}

export const useTooltip = () => {
    const [tooltipState, setTooltipState] = useState<TooltipState>({
        show: false,
        content: '',
        position: { x: 0, y: 0 }
    });

    const handleMouseOver = useCallback((event: React.MouseEvent<SVGPathElement, MouseEvent>, d: Feature) => {
        const name = d.properties?.buurtnaam || `Unnamed Feature, id: ${d.properties?.id}`;
        const benefitAmount = d.properties?.Bijstandsuitkering_10 ?? 'No data';

        setTooltipState({
            show: true,
            content: `${name} \n Bijstandsuitkering ${benefitAmount}%`,
            position: { x: event.pageX + 10, y: event.pageY - 10 }
        });
    }, []);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        setTooltipState(prev => ({
            ...prev,
            position: { x: event.pageX, y: event.pageY }
        }));
    }, []);

    const handleMouseOut = useCallback(() => {
        setTooltipState(prev => ({ ...prev, show: false }));
    }, []);

    return {
        tooltipState,
        handlers: {
            handleMouseOver,
            handleMouseMove,
            handleMouseOut
        }
    };
}; 