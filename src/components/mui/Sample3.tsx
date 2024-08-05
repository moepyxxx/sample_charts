import { FC, useMemo } from "react";
import { LineChart, LineSeriesType } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";
import { MakeOptional } from "@mui/x-charts/internals";

type Data = Partial<{
  createCount: number;
  companyCount: number;
  safetyPercentage: number;
  satisfactionPercentage: number;
}> & {
  month: string;
};

const dataset: Data[] = [
  {
    createCount: 59,
    companyCount: 57,
    safetyPercentage: 86,
    satisfactionPercentage: 21,
    month: "2023/07",
  },
  {
    createCount: 50,
    companyCount: 52,
    safetyPercentage: 78,
    satisfactionPercentage: 28,
    month: "2023/08",
  },
  {
    createCount: 47,
    companyCount: 53,
    safetyPercentage: 100,
    satisfactionPercentage: 41,
    month: "2023/09",
  },
  {
    createCount: 54,
    companyCount: 56,
    safetyPercentage: 92,
    satisfactionPercentage: 73,
    month: "2023/10",
  },
  {
    createCount: 57,
    companyCount: 69,
    safetyPercentage: 92,
    satisfactionPercentage: 99,
    month: "2023/11",
  },
];

export const Sample3: FC = () => {
  const series = useMemo(() => {
    const series: MakeOptional<LineSeriesType, "type">[] = [];
    series.push({
      dataKey: "createCount",
      type: "line",
      yAxisId: "left",
      label: "生産数",
      valueFormatter: (value) => `${value}個`,
    });
    series.push({
      dataKey: "companyCount",
      type: "line",
      yAxisId: "left",
      label: "出荷企業数",
      valueFormatter: (value) => `${value}社`,
    });
    series.push({
      dataKey: "safetyPercentage",
      type: "line",
      yAxisId: "right",
      label: "安全率",
      valueFormatter: (value) => `${value}%`,
    });
    series.push({
      dataKey: "satisfactionPercentage",
      type: "line",
      yAxisId: "right",
      label: "満足率",
      valueFormatter: (value) => `${value}%`,
    });
    return series;
  }, []);

  return (
    <Box>
      <Typography variant="h6">
        sample 3 multiple line : みかんの詳細
      </Typography>
      <LineChart
        dataset={dataset}
        width={600}
        height={300}
        axisHighlight={{
          x: "band",
        }}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        }}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            tickPlacement: "start",
            tickLabelPlacement: "middle",
            position: "top",
          },
        ]}
        yAxis={[
          {
            id: "left",
            scaleType: "linear",
            labelStyle: {
              fontSize: 12,
            },
          },
          {
            id: "right",
            max: 100,
            labelStyle: {
              fontSize: 12,
            },
          },
        ]}
        leftAxis="left"
        rightAxis="right"
        series={series}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "left" },
            padding: 0,
            labelStyle: {
              fontSize: 14,
            },
          },
        }}
      />
    </Box>
  );
};
