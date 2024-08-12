'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const RecentJobs = React.memo(() => {
  const [govJobs, setGovJobs] = useState([]);
  const [privateJobs, setPrivateJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const govResponse = await axios.get('https://jobbox-server-roan.vercel.app/api/gov');
        const privateResponse = await axios.get('https://jobbox-server-roan.vercel.app/api/private');
        
        setGovJobs(govResponse.data.slice(0, 3));
        setPrivateJobs(privateResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const renderJobs = (jobs, title) => (
    <div className="mb-4 animate-slideIn">
      <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-md mb-2 transform transition-all duration-300 hover:scale-105">
        {title}
      </h3>
      {jobs.map((job, index) => (
        <div 
          key={job.id} 
          className="border bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-600 p-2 mb-2 rounded-md transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 animate-fadeIn"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <Link 
            href={`/job/${job.id}`} 
            className="text-red-600 dark:text-red-400 text-sm hover:underline transition-colors duration-300 hover:text-red-800 dark:hover:text-red-300"
          >
            {job.job_title}
          </Link>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
            {job.organization}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="border-2 border-black dark:border-gray-600 p-4 mt-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-900">
      <div className="border border-gray-300 dark:border-gray-600 p-2 mb-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600 transition-all duration-300 hover:from-purple-600 hover:to-indigo-500">
        <h2 className="font-bold text-white text-lg text-center animate-pulse">Recent Jobs</h2>
      </div>
      {renderJobs(govJobs, "Government Jobs")}
      {renderJobs(privateJobs, "Private Jobs")}
    </div>
  );
});

export default RecentJobs;
