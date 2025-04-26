import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomersList } from './components/CustomersList';
import { TrainingsList } from './components/TrainingsList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/customers" />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/trainings" element={<TrainingsList />} />
      </Routes>
    </Router>
  );
}

export default App;
