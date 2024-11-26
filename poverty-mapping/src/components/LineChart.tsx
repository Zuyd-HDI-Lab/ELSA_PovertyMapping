import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface LineChartProps {
    data: { date: string; value: number }[];
    width: number;
    height: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return; // Null-check for svgRef.current

        // Set up the SVG canvas
        const svg = d3.select<SVGSVGElement, unknown>(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Clear any previous contents
        svg.selectAll("*").remove();

        // Set up margins
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Create scales
        const x = d3
            .scaleTime()
            .domain(
                d3.extent(data, (d) => new Date(d.date)) as [Date, Date]
            )
            .range([0, chartWidth]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value) || 0])
            .nice()
            .range([chartHeight, 0]);

        // Create the line generator
        const line = d3
            .line<{ date: string; value: number }>()
            .x((d) => x(new Date(d.date))!)
            .y((d) => y(d.value))
            .curve(d3.curveMonotoneX);

        // Append the chart group
        const chart = svg.append("g").attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

        // Add the x-axis
        chart
            .append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(
                d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d") as (
                    date: Date | { valueOf(): number }
                ) => string)
            );

        // Add the y-axis
        chart.append("g").call(d3.axisLeft(y));

        // Add the line path
        chart
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Optionally, add circles for data points
        chart
            .selectAll<SVGCircleElement, { date: string; value: number }>(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(new Date(d.date))!)
            .attr("cy", (d) => y(d.value))
            .attr("r", 4)
            .attr("fill", "steelblue");
    }, [data, width, height]);

    return <svg ref={svgRef}></svg>;
};

export default LineChart;
