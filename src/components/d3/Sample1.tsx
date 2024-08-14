import { Box } from "@mui/material";
import * as d3 from "d3";
import { format } from "date-fns";
import { FC, useMemo, useRef, useState } from "react";
import { useMount } from "react-use";

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

  const baseColor = useMemo(() => {
    const color = d3.color("steelblue");
    if (color === null) {
      throw new Error("color is null");
    }
    return color;
  }, []);

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

  const combinedExtent = [
    Math.min(...data.map((d) => d.lineValue), ...data.map((d) => d.barValue)),
    Math.max(...data.map((d) => d.lineValue), ...data.map((d) => d.barValue)),
  ];
  const commonY = d3
    .scaleLinear()
    .domain(combinedExtent)
    .nice() // スケールの端数を整える
    .range([height - marginBottom, marginTop]);

  const line = d3
    .line<{ date: Date; lineValue: number }>()
    .x((d) => dateX(d.date))
    .y((d) => commonY(d.lineValue))
    .curve(d3.curveCatmullRom.alpha(0.5));
  const d = line(data);
  if (d === null) {
    throw new Error("line is null");
  }

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
    .ticks(10)
    .tickFormat((d) => d3.timeFormat("%Y/%m")(d as Date));

  const yAxis = d3
    .axisLeft(commonY)
    .ticks((commonY.domain()[1] - commonY.domain()[0]) / 10)
    .tickSize(5)
    .tickSizeOuter(4)
    .tickFormat((d) => `${d} !`);

  const xAxisRef = useRef<SVGGElement | null>(null);
  const yAxisRef = useRef<SVGGElement | null>(null);

  useMount(() => {
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
        const barX = backgroundBarX(formatted);
        if (barX === undefined) {
          throw new Error("barX is undefined");
        }
        return barX + backgroundBarX.bandwidth() * 0.1;
      })
      .attr("y", function (d) {
        return commonY(d.barValue);
      })
      .attr("width", function () {
        return backgroundBarX.bandwidth() * 0.8; // 例として80%の幅を設定
      })
      .attr("height", function (d) {
        return height - commonY(d.barValue) - marginBottom - 1;
      })
      .attr("fill", baseColor.brighter(0.5).formatHex());

    // Lineグラフ
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", baseColor.brighter(1).formatHex())
      .attr("stroke-width", 1.5)
      .attr("d", d);

    const circlesGroup = svg.append("g").attr("class", "circles-group");
    circlesGroup
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("fill", "white")
      .attr("stroke", baseColor.brighter(1).formatHex())
      .attr("stroke-width", 1.5)
      .attr("cx", (d) => dateX(d.date))
      .attr("cy", (d) => commonY(d.lineValue))
      .attr("r", 5);

    // 背景（アクティブ検知）
    svg
      .selectAll(".backgroundBar")
      .data(data)
      .join("rect") // 要素を追加
      .attr("x", function (d) {
        const barX = backgroundBarX(format(d.date, "yyyy/MM"));
        if (barX === undefined) {
          throw new Error("barX is undefined");
        }
        return barX;
      })
      .attr("width", backgroundBarX.bandwidth())
      .attr("y", marginTop)
      .attr("height", function () {
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
  });

  return (
    <Box sx={{ position: "relative" }}>
      <svg width={width} height={height} ref={svgRef}>
        {/** XAxis */}
        <g ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
        {/** YAxis */}
        <g ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
      </svg>
      {tooltip && tooltip.show ? "ツールチップあるよ" : "ツールチップないよ"}
    </Box>
  );
};
