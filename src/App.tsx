import "./App.css";
import { Sample2 as MuiSample2 } from "./components/mui/Sample2";
import { Sample1 as MuiSample1 } from "./components/mui/Sample1";
import { Sample1 as RechartsSample1 } from "./components/recharts/Sample1";
import { Sample1 as D3Sample1 } from "./components/d3/Sample1";
import { Stack } from "@mui/material";
import { Sample3 as MuiSample3 } from "./components/mui/Sample3";

function App() {
  return (
    <Stack spacing={5}>
      <MuiSample1 />
      <MuiSample2 />
      <MuiSample3 />
      {/* <RechartsSample1 /> */}
      <D3Sample1
        data={[
          { date: new Date("2021/01"), value: 15 },
          { date: new Date("2021/02"), value: 22 },
          { date: new Date("2021/03"), value: 36 },
          { date: new Date("2021/04"), value: 41 },
          { date: new Date("2021/05"), value: 59 },
          { date: new Date("2021/06"), value: 89 },
          { date: new Date("2021/07"), value: 17 },
        ]}
      />
    </Stack>
  );
}

export default App;
