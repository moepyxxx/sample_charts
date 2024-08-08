import "./App.css";
import { Sample2 as MuiSample2 } from "./components/mui/Sample2";
import { Sample1 as MuiSample1 } from "./components/mui/Sample1";
import { Sample1 as RechartsSample1 } from "./components/recharts/Sample1";
import { Stack } from "@mui/material";
import { Sample3 as MuiSample3 } from "./components/mui/Sample3";

function App() {
  return (
    <Stack spacing={5}>
      <MuiSample1 />
      <MuiSample2 />
      <MuiSample3 />
      <RechartsSample1 />
    </Stack>
  );
}

export default App;
