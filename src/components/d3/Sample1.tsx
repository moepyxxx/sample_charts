import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

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
  marginTop = 60,
  marginRight = 40,
  marginBottom = 20,
  marginLeft = 40,
}) => {
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
    .y((d) => y(d.value));
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
  }, [xAxis, yAxis]);

  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={d} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(d.date)} cy={y(d.value)} r="2.5" />
        ))}
      </g>
      <g ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
      <g ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
    </svg>
  );
};
