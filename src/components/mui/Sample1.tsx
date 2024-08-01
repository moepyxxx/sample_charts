import { BarChart } from '@mui/x-charts';
import './Sample1.css';
import { FC, useMemo, useState } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
  Box,
} from '@mui/material';

type DataSelect = 'ringo' | 'mikan' | 'gokei';

type Data = Partial<{
  itemA: number;
  itemB: number;
  itemC: number;
  itemD: number;
}> & {
  month: string;
};

const createDataset = (currentSelect: DataSelect) => {
  const dataset: Data[] = [
    {
      itemA: 59,
      itemB: 57,
      itemC: 86,
      itemD: 21,
      month: '2023/07',
    },
    {
      itemA: 50,
      itemB: 52,
      itemC: 78,
      itemD: 28,
      month: '2023/08',
    },
    {
      itemA: 47,
      itemB: 53,
      itemC: 106,
      itemD: 41,
      month: '2023/09',
    },
    {
      itemA: 54,
      itemB: 56,
      itemC: 92,
      itemD: 73,
      month: '2023/10',
    },
    {
      itemA: 57,
      itemB: 69,
      itemC: 92,
      itemD: 99,
      month: '2023/11',
    },
    {
      itemA: 60,
      itemB: 63,
      itemC: 103,
      itemD: 144,
      month: '2023/12',
    },
    {
      itemA: 59,
      itemB: 60,
      itemC: 105,
      itemD: 319,
      month: '2024/01',
    },
    {
      itemA: 65,
      itemB: 60,
      itemC: 106,
      itemD: 20,
      month: '2023/02',
    },
    {
      itemA: 51,
      itemB: 51,
      itemC: 95,
      itemD: 131,
      month: '2024/03',
    },
    {
      itemA: 60,
      itemB: 65,
      itemC: 97,
      itemD: 55,
      month: '2024/04',
    },
    {
      itemA: 67,
      itemB: 64,
      itemC: 76,
      itemD: 48,
      month: '2024/05',
    },
    {
      itemA: 61,
      itemB: 70,
      itemC: 103,
      itemD: 25,
      month: '2024/06',
    },
  ];
  const customDataset: Data[] = [];
  switch (currentSelect) {
    case 'ringo':
      customDataset.push(
        ...dataset.map((data) => ({
          itemA: data.itemA,
          month: data.month,
        }))
      );
      break;
    case 'mikan':
      customDataset.push(
        ...dataset.map((data) => ({
          itemB: data.itemB,
          itemC: data.itemC,
          month: data.month,
        }))
      );
      break;
    case 'gokei':
      customDataset.push(
        ...dataset.map((data) => ({
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
    useState<DataSelect>('gokei');

  const series = useMemo(() => {
    const s = [];
    const valueFormatter = (value: number | null) => `${value}`;

    if (currentDataSelect === 'ringo' || currentDataSelect === 'gokei') {
      s.push({
        dataKey: 'itemA',
        stack: 'A',
        label: 'りんごがとれた数',
        valueFormatter,
        color: '#62b4f7',
      });
    }

    if (currentDataSelect === 'mikan' || currentDataSelect === 'gokei') {
      s.push({
        dataKey: 'itemB',
        label: 'みかんがとれた数',
        stack: 'A',
        valueFormatter,
        color: '#7fea79',
      });
    }

    if (currentDataSelect === 'mikan') {
      s.push({
        dataKey: 'itemC',
        label: '有田みかんの数',
        valueFormatter,
        color: '#f8ed69',
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
          }}
        >
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
            x: 'band',
          }}
          // barLabel={(item: BarItem, _: BarLabelContext) => String(item.value)}
          borderRadius={2}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              tickPlacement: 'start',
              tickLabelPlacement: 'middle',
              position: 'top',
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
              transform: 'translateX(-10px)',
            },
          }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'left' },
              padding: 0,
              labelStyle: {
                fontSize: 14,
              },
            },
          }}
          tooltip={{
            trigger: 'axis',
          }}
        />
      </div>
    </Box>
  );
};
