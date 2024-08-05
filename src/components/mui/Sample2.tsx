import { FC } from "react";
import {
  ResponsiveChartContainer,
  LinePlot,
  BarPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsAxisHighlight,
  ChartsLegend,
  ChartsTooltip,
  ChartsAxisTooltipContent,
} from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

export const Sample2: FC = () => {
  return (
    <Box>
      <Typography variant="h6">
        sample 2 bar and line : りんごとみかんの総数ととても良いりんご率
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <ResponsiveChartContainer
          dataset={[
            {
              ringo: 10,
              mikan: 20,
              bestRingo: 4,
              bestMikan: 3,
              bestRingoPercentage: 10,
              bestMikanPercentage: 30,
              month: "2023/04",
            },
            {
              ringo: 15,
              mikan: 26,
              bestRingo: 5,
              bestMikan: 7,
              bestRingoPercentage: 2,
              bestMikanPercentage: 10,
              month: "2023/05",
            },
            {
              ringo: 40,
              mikan: 23,
              bestRingo: 8,
              bestMikan: 2,
              bestRingoPercentage: 50,
              bestMikanPercentage: 5,
              month: "2023/06",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              id: "x-axis-month",
            },
          ]}
          yAxis={[
            {
              labelStyle: {
                fontSize: 12,
              },
              id: "y-axis",
            },
          ]}
          series={[
            {
              dataKey: "ringo",
              type: "bar",
              stack: "A",
              label: "りんごの総数",
              color: "#62b4f7",
            },
            {
              dataKey: "mikan",
              type: "bar",
              stack: "A",
              label: "みかんの総数",
              color: "#7fea79",
            },
            {
              type: "bar",
              dataKey: "bestRingo",
              stack: "B",
              label: "よいりんご",
              color: "#62b4f7",
            },
            {
              dataKey: "bestMikan",
              type: "bar",
              stack: "B",
              label: "よいみかん",
              color: "#7fea79",
            },
            {
              type: "line",
              dataKey: "bestRingoPercentage",
              label: "よいりんご率",
              color: "#0846a3",
            },
            {
              type: "line",
              dataKey: "bestMikanPercentage",
              label: "よいみかん率",
              color: "#0846a3",
            },
          ]}
          height={400}
          margin={{ left: 30 }}>
          <BarPlot />
          <LinePlot />
          <ChartsXAxis axisId="x-axis-month" />
          <ChartsYAxis axisId="y-axis" />
          <ChartsTooltip
            trigger="axis"
            slots={{
              axisContent: ({ axisData, classes, series }) => {
                // ここで比率や前週比を出す
                // ChartsAxisTooltipContentを書き換える必要あり
                return (
                  <>
                    <ChartsAxisTooltipContent
                      axisData={axisData}
                      classes={classes}
                      contentProps={{
                        series: series,
                      }}
                    />
                  </>
                );
              },
            }}
          />
          <ChartsAxisHighlight />
          <ChartsLegend
            position={{ vertical: "top", horizontal: "left" }}
            slotProps={{ legend: { labelStyle: { fontSize: 14 } } }}
          />
        </ResponsiveChartContainer>
      </Box>
    </Box>
  );
};
