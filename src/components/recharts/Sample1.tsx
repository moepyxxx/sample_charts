import { FC, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { DataSelect, items } from "../datas/item";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

export const Sample1: FC = () => {
  const [currentDataSelect, setDataCurrentSelect] =
    useState<DataSelect>("gokei");

  return (
    <Box sx={{ height: 500, width: 1000 }}>
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={1000}
          data={items}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 5,
          }}>
          <XAxis dataKey="month" />
          <YAxis max={500} />
          <Legend
            align="left"
            verticalAlign="top"
            height={40}
            margin={{ bottom: 100, top: 100 }}
          />
          <Tooltip />
          {(currentDataSelect === "ringo" || currentDataSelect === "gokei") && (
            <Bar
              dataKey="itemA"
              barSize={40}
              fill="#8884d8"
              stackId="a"
              name="りんごがとれた数"
              activeBar={<Rectangle fill="#808080" stroke="#808080" />}
            />
          )}
          {(currentDataSelect === "mikan" || currentDataSelect === "gokei") && (
            <Bar
              dataKey="itemB"
              barSize={30}
              stackId="a"
              fill="#82ca9d"
              name="みかんがとれた数"
              activeBar={<Rectangle fill="#808080" stroke="#808080" />}
            />
          )}
          {currentDataSelect === "mikan" && (
            <Bar
              dataKey="itemC"
              stackId="b"
              barSize={20}
              name="有田みかんの数"
              fill="pink"
              activeBar={<Rectangle fill="#808080" stroke="#808080" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
