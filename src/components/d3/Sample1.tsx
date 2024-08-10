import { Box } from "@mui/material";
import * as d3 from "d3";
import { format } from "date-fns";
import { FC, useEffect, useRef, useState } from "react";

type Props = {
  data: { date: Date; lineValue: number; barValue: number }[];
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

  const dateX = d3
    .scaleTime()
    .domain([startDate, endDate])
    .range([marginLeft, width - marginRight]);

  const extent = d3.extent(data.map((d) => d.lineValue));
  if (extent[0] === undefined || extent[1] === undefined) {
    throw new Error("extent is undefined");
  }
  const lineY = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.lineValue) as number])
    .nice()
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line<{ date: Date; lineValue: number }>()
    .x((d) => dateX(d.date))
    .y((d) => lineY(d.lineValue))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const d = line(data);
  if (d === null) {
    throw new Error("line is null");
  }

  const barYExtent = d3.extent(data.map((d) => d.barValue));
  if (barYExtent[0] === undefined || barYExtent[1] === undefined) {
    throw new Error("barYExtent is undefined");
  }
  const barY = d3
    .scaleLinear()
    .domain(barYExtent)
    .range([height - marginBottom, marginTop]);

  const backgroundBarX = d3
    .scaleBand()
    .range([marginLeft, width - marginRight])
    .domain(
      data.map(function (d) {
        return format(d.date, "yyyy/MM");
      })
    )
    .padding(0);

  const xAxis = d3
    .axisBottom(dateX)
    .ticks(5)
    .tickFormat((d) => d3.timeFormat("%Y/%m")(d as Date));
  const yAxis = d3
    .axisLeft(lineY)
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

    const svg = d3.select(svgRef.current);

    // 棒グラフ
    svg
      .selectAll(".bar") // 要素がない
      .data(data)
      .join("rect") // 要素を追加
      .attr("x", function (d) {
        const formatted = format(d.date, "yyyy/MM");
        return backgroundBarX(formatted) + backgroundBarX.bandwidth() * 0.1;
      })
      .attr("y", function (d) {
        return barY(d.barValue);
      })
      .attr("width", function (d) {
        return backgroundBarX.bandwidth() * 0.8; // 例として80%の幅を設定
      })
      .attr("height", function (d) {
        return height - barY(d.barValue) - marginBottom - 1;
      })
      .attr("fill", "#f6ad49");

    // Lineグラフ
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#008899")
      .attr("stroke-width", 1.5)
      .attr("d", d);

    const circlesGroup = svg.append("g").attr("class", "circles-group");
    circlesGroup
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("fill", "white")
      .attr("stroke", "#008899")
      .attr("stroke-width", 1.5)
      .attr("cx", (d) => dateX(d.date))
      .attr("cy", (d) => lineY(d.lineValue))
      .attr("r", 5);

    // 背景（アクティブ検知）
    svg
      .selectAll(".backgroundBar")
      .data(data)
      .join("rect") // 要素を追加
      .attr("x", function (d) {
        const formatted = format(d.date, "yyyy/MM");
        return backgroundBarX(formatted);
      })
      .attr("width", backgroundBarX.bandwidth())
      .attr("y", marginTop)
      .attr("height", function (d) {
        return height - marginTop - marginBottom;
      })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill", "rgba(0, 0, 0, 0.1)");
        setTooltip({
          x: event.offsetX,
          y: event.offsetY,
          date: d.date,
          value: d.lineValue,
          show: true,
        });
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "none");
        setTooltip(null);
      });
  }, [
    xAxis,
    yAxis,
    data,
    backgroundBarX,
    height,
    marginBottom,
    marginTop,
    barY,
    d,
    dateX,
    lineY,
  ]);

  console.log("hog");

  return (
    <Box sx={{ position: "relative" }}>
      <svg width={width} height={height} ref={svgRef}>
        {/* <path fill="none" stroke="#008899" strokeWidth="1.5" d={d} />
        <g fill="white" stroke="#008899" strokeWidth="1.5">
          {data.map((d, i) => (
            <circle
              key={i}
              stroke="#008899"
              cx={dateX(d.date)}
              cy={lineY(d.lineValue)}
              r="5"
            />
          ))}
        </g> */}
        {/** XAxis */}
        <g ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
        {/** YAxis */}
        <g ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
      </svg>
      {tooltip && tooltip.show ? "ツールチップあるよ" : "ツールチップないよ"}
    </Box>
  );
};
