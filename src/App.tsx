import './App.css';
import { Sample2 } from './components/mui/Sample2';
import { Sample1 } from './components/mui/Sample1';
import { Stack } from '@mui/material';

function App() {
  return (
    <Stack spacing={5}>
      <Sample1 />
      <Sample2 />
    </Stack>
  );
}

export default App;
