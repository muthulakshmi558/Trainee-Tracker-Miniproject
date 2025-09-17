import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const isTrainer = true; // Replace with actual role checking
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Mini Project Tracker</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Projects</Link>
          {isTrainer && (
            <>
              <Link to="/create" className="text-white hover:text-blue-200">Create Project</Link>
              <Link to="/reports" className="text-white hover:text-blue-200">Reports</Link>
            </>
          )}
          {token ? (
            <button onClick={handleLogout} className="text-white hover:text-blue-200">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;