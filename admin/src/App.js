import Index from './components/Index';
import Add from './components/Add';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
