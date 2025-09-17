import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const isTrainer = true; // Replace with actual role checking
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [filters, token, navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      
      const response = await axiosInstance.get('/projects/', { params });
      console.log('API Response:', response.data); // Debug response
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.status === 401 ? 'Unauthorized: Please log in' : err.message);
      setProjects([]);
      if (err.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axiosInstance.delete(`/projects/${id}/`);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      
      <div className="mb-4 flex space-x-4">
        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="border p-2 rounded"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-600">No projects found.</p>
      )}

      <div className="grid gap-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              <p>Status: {project.status}</p>
              <p>Priority: {project.priority}</p>
              <p>Due: {new Date(project.due_date).toLocaleDateString()}</p>
              <div className="mt-2 space-x-2">
                <Link to={`/edit/${project.id}`} className="text-blue-600 hover:underline">Edit</Link>
                {isTrainer && (
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}

export default ProjectList;