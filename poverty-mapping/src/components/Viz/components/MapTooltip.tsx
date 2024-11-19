import React from 'react';

interface MapTooltipProps {
    show: boolean;
    content: string;
    position: {
        x: number;
        y: number;
    };
}

const MapTooltip: React.FC<MapTooltipProps> = ({ show, content, position }) => {
    if (!show) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                backgroundColor: 'white',
                padding: '5px',
                border: '1px solid black',
                borderRadius: '3px',
                pointerEvents: 'none',
                transform: 'translate(-50%, -100%)'
            }}
        >
            {content}
        </div>
    );
};

export default MapTooltip; 