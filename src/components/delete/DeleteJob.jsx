// DeleteJob.js
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const DeleteJobList = ({ jobs, onDelete, darkMode }) => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
  
    return (
      <div className={`space-y-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}>
        {jobs.map(job => (
          <div key={job.id} className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex-1 min-w-0">
              <h4 
                className="font-bold break-words" 
                style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
              >
                {job.job_title}
              </h4>
              <p className="text-sm text-red-500">Organization: {job.organization}</p>
              <p className="text-sm text-blue-500">Category: {job.category}</p>
              <p className="text-xs">Posted on: {formatDate(job.created_at)}</p>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this job?')) {
                  onDelete(job.id);
                }
              }} 
              className={`ml-4 px-3 py-1 rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };

const DeleteJob = ({ darkMode }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://job-server-ruby.vercel.app:5000/api/jobs');
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const id = parseInt(jobId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid job ID');
      }

      const response = await axios.delete(`https://job-server-ruby.vercel.app:5000/api/jobs/${id}`);
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
        setMessage('Job deleted successfully');
        setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
      } else {
        setError(`Failed to delete job: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteJobList jobs={jobs} onDelete={handleDeleteJob} darkMode={darkMode} />
    </div>
  );
};

export default DeleteJob;