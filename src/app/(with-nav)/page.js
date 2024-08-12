// pages/job.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ImportantLinks from '@/components/ImportantLinks';
import RecentJobs from '@/components/RecentJobs';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://jobbox-server-roan.vercel.app/api/jobs');
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

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center'>Failed to load jobs</div>;

  return (
    <div className="bg-white dark:bg-black dark:text-white">
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-2/3 border-2 border-black dark:border-gray-700 p-4 bg-white dark:bg-gray-900 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-4 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Job Listings
          </h2>
          {currentJobs.map((job) => (
            <div key={job.id} className="mb-4">
              <Link href={`/job/${job.id}`}>
                <h2 className="text-2xl text-red-700 dark:text-red-400 font-medium mb-3 hover:underline cursor-pointer">
                  {job.job_title}
                </h2>
              </Link>
              <p className="text-gray-800 dark:text-gray-200 font-bold text-xs mb-1">{job.organization}</p>
              <p className="text-gray-600 dark:text-gray-400 font-bold text-xs mb-3">Posted on: {formatDate(job.created_at)}</p>
              <div 
                className="whitespace-pre-wrap break-words text-sm space-y-4 text-black dark:text-white mb-3"
                style={{fontFamily: 'inherit'}}
                dangerouslySetInnerHTML={renderDescription(job.job_description)}
              />
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-sm text-green-900 dark:text-green-400 font-bold mr-2">Category:</span>
                  <Link href={job.category === 'government' ? '/government_job' : '/private_job'} className="text-sm text-blue-800 dark:text-blue-400 px-1 py-1 rounded-full hover:underline">
                    {job.category}...
                  </Link>
                </div>
                <Link href={`/job/${job.id}`} className="text-sm text-red-600 dark:text-red-500 font-bold hover:text-red-700 dark:hover:text-red-400 hover:underline">
                  Read More...
                </Link>
              </div>
              <hr className="my-4 dark:border-gray-700" />
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
            >
              previous
            </button>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={indexOfLastJob >= jobs.length}
              className={`px-3 py-1 text-sm font-bold rounded underline ${indexOfLastJob >= jobs.length ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
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

export default JobPage;