import { BarChart } from "@mui/x-charts";
import "./Sample1.css";
import { FC, useMemo, useState } from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { DataSelect, items, type Item } from "../datas/item";

const createDataset = (currentSelect: DataSelect) => {
  const customDataset: Item[] = [];
  switch (currentSelect) {
    case "ringo":
      customDataset.push(
        ...items.map((data) => ({
          itemA: data.itemA,
          month: data.month,
        }))
      );
      break;
    case "mikan":
      customDataset.push(
        ...items.map((data) => ({
          itemB: data.itemB,
          itemC: data.itemC,
          month: data.month,
        }))
      );
      break;
    case "gokei":
      customDataset.push(
        ...items.map((data) => ({
          itemB: data.itemB,
          itemA: data.itemA,
          month: data.month,
        }))
      );
      break;
  }
  return customDataset;
};

export const Sample1: FC = () => {
  const [currentDataSelect, setDataCurrentSelect] =
    useState<DataSelect>("gokei");

  const series = useMemo(() => {
    const s = [];
    const valueFormatter = (value: number | null) => `${value}`;

    if (currentDataSelect === "ringo" || currentDataSelect === "gokei") {
      s.push({
        dataKey: "itemA",
        stack: "A",
        label: "りんごがとれた数",
        valueFormatter,
        color: "#62b4f7",
      });
    }

    if (currentDataSelect === "mikan" || currentDataSelect === "gokei") {
      s.push({
        dataKey: "itemB",
        label: "みかんがとれた数",
        stack: "A",
        valueFormatter,
        color: "#7fea79",
      });
    }

    if (currentDataSelect === "mikan") {
      s.push({
        dataKey: "itemC",
        label: "有田みかんの数",
        valueFormatter,
        color: "#f8ed69",
      });
    }

    return s;
  }, [currentDataSelect]);

  return (
    <Box>
      <Typography variant="h6">
        sample 1 bar only : りんごとみかんがとれた数
      </Typography>

      <FormControl sx={{ py: 2 }}>
        <FormLabel id="data-select">表示データ</FormLabel>
        <RadioGroup
          aria-labelledby="data-select"
          name="controlled-radio-buttons-group"
          value={currentDataSelect}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDataCurrentSelect(
              (event.target as HTMLInputElement).value as DataSelect
            );
          }}>
          <Stack direction="row">
            <FormControlLabel
              value="mikan"
              control={<Radio />}
              label="みかん"
            />
            <FormControlLabel
              value="ringo"
              control={<Radio />}
              label="りんご"
            />
            <FormControlLabel value="gokei" control={<Radio />} label="合計" />
          </Stack>
        </RadioGroup>
      </FormControl>

      <div className="bar-chart">
        <BarChart
          dataset={createDataset(currentDataSelect)}
          axisHighlight={{
            x: "band",
          }}
          // barLabel={(item: BarItem, _: BarLabelContext) => String(item.value)}
          borderRadius={2}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
              tickPlacement: "start",
              tickLabelPlacement: "middle",
              position: "top",
              // typeエラーになるが設定はできる
              // categoryGapRatio: 0.1,
              // barGapRatio: 0.1,
            },
          ]}
          yAxis={[
            {
              // label: 'rainfall',
              labelStyle: {
                fontSize: 12,
              },
            },
          ]}
          series={series}
          grid={{ horizontal: true }}
          // ここで全体のバーの大きさは調整
          width={1000}
          height={300}
          margin={{
            left: 30,
            bottom: 40,
          }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-10px)",
            },
          }}
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
          tooltip={{
            trigger: "axis",
          }}
        />
      </div>
    </Box>
  );
};
