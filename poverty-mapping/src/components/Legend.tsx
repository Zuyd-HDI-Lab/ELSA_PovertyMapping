import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface LegendContent {
  title: string;
  items: Array<{
    color: string;
    label: string;
  }>;
}

interface LegendProps {
  content: LegendContent | null;
}

const Legend: React.FC<LegendProps> = ({ content }) => {
  if (!content) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {content.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: item.color }} 
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Legend; 