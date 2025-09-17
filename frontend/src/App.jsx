import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Reports from './components/Reports';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProjectList />} />
            <Route path="/create" element={<ProjectForm />} />
            <Route path="/edit/:id" element={<ProjectForm />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;