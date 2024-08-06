// pages/job.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImportantLinks from '@/components/ImportantLinks';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load jobs</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-2/3 border-2 border-black p-4 bg-white shadow-md">
          {jobs.map((job) => (
            <div key={job.id} className="mb-4">
              <h2 className="text-2xl text-red-700 font-bold mb-3">{job.job_title}</h2>
              <p className="text-gray-800 text-xs mb-3">{job.organization}</p>
              <p className="text-sm text-black mb-3">{job.job_description}</p>
              <div className="text-right">
                <a href="#" className="text-blue-500">Read More</a>
              </div>
              <hr className="my-4" />
            </div>
          ))}
        </div>
        
        <div className="md:w-1/3">
          <ImportantLinks />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
