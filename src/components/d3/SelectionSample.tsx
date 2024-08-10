import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { format } from "date-fns";

type Props = {
  data: { date: Date; value: number }[];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};
export const SelectionSample: FC<Props> = ({
  width = 640,
  height = 400,
  data = [],
  marginTop = 40,
  marginRight = 40,
  marginBottom = 20,
  marginLeft = 40,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return format(d.date, "yyyy/MM");
      })
    )
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) as number])
    .nice()
    .range([height, 0]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // 棒グラフ
    svg
      .selectAll(".bar") // 要素がない
      .data(data)
      .join("rect") // 要素を追加
      .attr("x", function (d) {
        const formatted = format(d.date, "yyyy/MM");
        return x(formatted);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", "#69b3a2");

    // 背景（アクティブ検知）
    svg
      .selectAll(".backgroundBar")
      .data(data)
      .join("rect") // 要素を追加
      .attr("x", function (d) {
        const formatted = format(d.date, "yyyy/MM");
        return x(formatted);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height;
      })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function (event, d) {
        console.log("mouseover", event, d);
      });
  }, [data, height, x, y]);

  return <svg width={width} height={height} ref={svgRef}></svg>;
};
