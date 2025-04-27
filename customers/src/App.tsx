import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { Navbar } from './components/Navbar';
import { CustomersList } from './components/CustomersList';
import { TrainingsList } from './components/TrainingsList';
import { CalendarView } from './components/CalendarView';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
          <Navbar />
          <Container 
            maxWidth={false} 
            disableGutters 
            sx={{ 
              flexGrow: 1, 
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto'
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/customers" />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/trainings" element={<TrainingsList />} />
              <Route path="/calendar" element={<CalendarView />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;