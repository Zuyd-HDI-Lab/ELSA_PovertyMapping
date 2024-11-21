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
                padding: '8px',
                border: '1px solid black',
                borderRadius: '4px',
                pointerEvents: 'none',
                transform: 'translate(-50%, -100%)',
                whiteSpace: 'pre-line',
                fontSize: '14px',
                lineHeight: '1.4'
            }}
        >
            {content}
        </div>
    );
};

export default MapTooltip; 