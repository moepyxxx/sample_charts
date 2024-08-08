export type Item = Partial<{
  itemA: number;
  itemB: number;
  itemC: number;
  itemD: number;
}> & {
  month: string;
};

export type DataSelect = "ringo" | "mikan" | "gokei";

export const items: Item[] = [
  {
    itemA: 59,
    itemB: 57,
    itemC: 86,
    itemD: 21,
    month: "2023/07",
  },
  {
    itemA: 50,
    itemB: 52,
    itemC: 78,
    itemD: 28,
    month: "2023/08",
  },
  {
    itemA: 47,
    itemB: 53,
    itemC: 106,
    itemD: 41,
    month: "2023/09",
  },
  {
    itemA: 54,
    itemB: 56,
    itemC: 92,
    itemD: 73,
    month: "2023/10",
  },
  {
    itemA: 57,
    itemB: 69,
    itemC: 92,
    itemD: 99,
    month: "2023/11",
  },
  {
    itemA: 60,
    itemB: 63,
    itemC: 103,
    itemD: 144,
    month: "2023/12",
  },
  {
    itemA: 59,
    itemB: 60,
    itemC: 105,
    itemD: 319,
    month: "2024/01",
  },
  {
    itemA: 65,
    itemB: 60,
    itemC: 106,
    itemD: 20,
    month: "2023/02",
  },
  {
    itemA: 51,
    itemB: 51,
    itemC: 95,
    itemD: 131,
    month: "2024/03",
  },
  {
    itemA: 60,
    itemB: 65,
    itemC: 97,
    itemD: 55,
    month: "2024/04",
  },
  {
    itemA: 67,
    itemB: 64,
    itemC: 76,
    itemD: 48,
    month: "2024/05",
  },
  {
    itemA: 61,
    itemB: 70,
    itemC: 103,
    itemD: 25,
    month: "2024/06",
  },
];
