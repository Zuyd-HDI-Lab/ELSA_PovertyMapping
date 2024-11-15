import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DiscreteContent = Array<{
  color: string;
  label: string;
}>;

type GradientStop = {
  color: string;
  value: number;
  label?: string;
};

type GradientContent = {
  stops: GradientStop[];
};

type LegendProps = {
  title: string;
  type: 'discrete' | 'gradient';
  content: DiscreteContent | GradientContent;
};

const Legend: React.FC<LegendProps> = ({ title, type, content }) => {
  const gradientRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    if (gradientRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setWidth(entry.contentRect.width - 16);
        }
      });

      resizeObserver.observe(gradientRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const renderContent = () => {
    if (type === 'discrete') {
      const discreteContent = content as DiscreteContent;
      return (
        <div className="space-y-2">
          {discreteContent.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      );
    }

    const gradientContent = content as GradientContent;
    const gradientId = `gradient-${title.toLowerCase().replace(/\s+/g, '-')}`;
    const height = 20;

    const sortedStops = [...gradientContent.stops].sort((a, b) => a.value - b.value);
    const minValue = sortedStops[0].value;
    const maxValue = sortedStops[sortedStops.length - 1].value;

    const gradientStops = sortedStops.map(stop => ({
      offset: `${((stop.value - minValue) / (maxValue - minValue)) * 100}%`,
      color: stop.color,
      label: stop.label || `${stop.value}%`
    }));

    return (
      <div className="space-y-2">
        <div ref={gradientRef} className="px-2">
          <svg width={width} height={height}>
            <defs>
              <linearGradient id={gradientId} x1="0" x2="1">
                {gradientStops.map((stop, i) => (
                  <stop
                    key={i}
                    offset={stop.offset}
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
            </defs>
            <rect width={width} height={height} fill={`url(#${gradientId})`} />
          </svg>
          <div className="relative h-6 mt-1">
            {gradientStops.map((stop, i) => {
              const isFirst = i === 0;
              const isLast = i === gradientStops.length - 1;
              return (
                <span
                  key={i}
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: stop.offset,
                    ...(isFirst && { transform: 'translateX(0)' }),
                    ...(isLast && { transform: 'translateX(-100%)' })
                  }}
                >
                  {stop.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Legend; 