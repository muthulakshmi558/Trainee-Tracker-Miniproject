import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/projects/reports/');
      setReports(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Project Reports</h2>
      
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4">
        {reports.map((report, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <p>Status: {report.status}</p>
            <p>Count: {report.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;