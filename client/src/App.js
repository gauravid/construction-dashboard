import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddTool from './pages/AddTool';
import ToolList from './pages/ToolList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tools" element={<ToolList />} />
        <Route path="/add" element={<AddTool />} />
      </Routes>
    </Router>
  );
}

export default App;
