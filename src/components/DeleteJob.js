import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Loadingspin from '@/components/Loadingspin';

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
            className={`ml-4 px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobbox-server-roan.vercel.app/api/jobs/delete', {
        params: {
          page: currentPage,
          limit: jobsPerPage,
        },
      });
      // Reverse the jobs array to show oldest first
      const Jobs = response.data.jobs;
      setJobs(Jobs);
      setTotalJobs(response.data.totalJobs);
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

      const response = await axios.delete(`https://jobbox-server-roan.vercel.app/api/jobs/${id}`);
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
        setMessage('Job deleted successfully');
        setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds

        // Refetch jobs to ensure the correct count after deletion
        fetchJobs();
      } else {
        setError(`Failed to delete job: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Loadingspin/>;
  // <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteJobList jobs={jobs} onDelete={handleDeleteJob} darkMode={darkMode} />
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Prev page
        </button>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage * jobsPerPage >= totalJobs}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage * jobsPerPage >= totalJobs ? 'bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default DeleteJob;
