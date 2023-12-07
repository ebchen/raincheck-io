import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './FormPage'; // Your form page component
import SchedulePage from './SchedulePage'; // Your schedule page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
