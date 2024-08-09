import { Box, Tooltip } from "@mui/material";
import * as d3 from "d3";
import { FC, useEffect, useRef, useState } from "react";

type Props = {
  data: { date: Date; value: number }[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};
export const Sample1: FC<Props> = ({
  data,
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 20,
  marginLeft = 40,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: Date;
    value: number;
    show: boolean;
  } | null>(null);

  const dateExtent = d3.extent(data, (d) => d.date) as [Date, Date];
  // 日付の範囲に余裕を加える
  const startDate = new Date(dateExtent[0].getTime());
  startDate.setDate(startDate.getDate() - 15);
  const endDate = new Date(dateExtent[1].getTime());
  endDate.setDate(endDate.getDate() + 15);

  const x = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([marginLeft, width - marginRight]);

  const extent = d3.extent(data.map((d) => d.value));
  if (extent[0] === undefined || extent[1] === undefined) {
    throw new Error("extent is undefined");
  }
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) as number])
    .nice()
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line<{ date: Date; value: number }>()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const d = line(data);
  if (d === null) {
    throw new Error("line is null");
  }

  const xAxis = d3
    .axisBottom(x)
    .ticks(5)
    .tickFormat((d) => d3.timeFormat("%Y/%m")(d as Date));
  const yAxis = d3
    .axisLeft(y)
    .ticks(10)
    .tickSize(5)
    .tickSizeOuter(4)
    .tickFormat((d) => `${d} s`);
  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (xAxisRef.current) {
      d3.select(xAxisRef.current).call(xAxis);
    }
    if (yAxisRef.current) {
      d3.select(yAxisRef.current).call(yAxis);
    }

    // ツールチップ
    const svg = d3.select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .on("mouseover", (event, d) => {
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          date: d.date,
          value: d.value,
          show: true,
        });
      })
      .on("mouseout", () => {
        setTooltip(null);
      });
  }, [xAxis, yAxis, data, x, y]);

  return (
    <Box sx={{ position: "relative" }}>
      <svg width={width} height={height} ref={svgRef}>
        <path fill="none" stroke="#008899" strokeWidth="1.5" d={d} />
        <g fill="white" stroke="#008899" strokeWidth="1.5">
          {data.map((d, i) => (
            <circle
              key={i}
              stroke="#008899"
              cx={x(d.date)}
              cy={y(d.value)}
              r="5"
            />
          ))}
        </g>
        <g ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
        <g ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
      </svg>
      {tooltip && tooltip.show ? "ツールチップあるよ" : "ツールチップないよ"}
    </Box>
  );
};
