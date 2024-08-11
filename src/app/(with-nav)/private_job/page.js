// pages/private_job.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ImportantLinks from '@/components/ImportantLinks';
import RecentJobs from '@/components/RecentJobs';

const PrivateJobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/private');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const truncateDescription = (description, lines = 2) => {
    const descriptionLines = description.split('\n');
    if (descriptionLines.length > lines) {
      return descriptionLines.slice(0, lines).join('') + '...';
    }
    return description;
  };

  const renderDescription = (description) => {
    const content = truncateDescription(description);
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    const htmlContent = content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });

    const formattedContent = htmlContent.replace(/\n/g, '<br>');
    
    return { __html: formattedContent };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className='text-center text-white'>Loading...</div>;
  if (error) return <div className='text-center text-white'>Failed to load jobs</div>;

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-2/3 border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-green-600 to-blue-500 text-white py-2 px-4 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <span className="mr-2">🚀</span>
              Private Jobs
              <span className="ml-2">💼</span>
            </h2>
            {currentJobs.map((job) => (
              <div key={job.id} className="mb-4">
                <Link href={`/job/${job.id}`}>
                  <h2 className="text-2xl text-red-700 font-medium mb-3 hover:underline cursor-pointer dark:text-red-400">
                    {job.job_title}
                  </h2>
                </Link>
                <p className="text-gray-800 font-bold text-xs mb-1 dark:text-gray-300">{job.organization}</p>
                <p className="text-gray-600 font-bold text-xs mb-3 dark:text-gray-400">Posted on: {formatDate(job.created_at)}</p>
                <div 
                  className="whitespace-pre-wrap break-words text-sm space-y-4 dark:text-gray-200 mb-3"
                  style={{fontFamily: 'inherit'}}
                  dangerouslySetInnerHTML={renderDescription(job.job_description)}
                />
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <span className="text-sm text-green-900 font-bold mr-2 dark:text-green-400">Category:</span>
                    <Link href={job.category === 'government' ? '/government_job' : '/private_job'} className="text-sm text-blue-800 px-1 py-1 rounded-full hover:underline dark:text-blue-400">
                      {job.category}...
                    </Link>
                  </div>
                  <Link href={`/job/${job.id}`} className="text-sm text-red-600 font-bold hover:text-red-700 hover:underline dark:text-red-500">
                    Read More...
                  </Link>
                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-600" />
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                previous
              </button>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={indexOfLastJob >= jobs.length}
                className={`px-3 py-1 text-sm font-bold rounded underline ${indexOfLastJob >= jobs.length ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                next
              </button>
            </div>
          </div>
          
          <div className="md:w-1/3 flex flex-col gap-1">
            <ImportantLinks />
            <RecentJobs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateJobPage;
