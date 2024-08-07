// pages/job.js
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ImportantLinks from '@/components/ImportantLinks';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState({});

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

  const toggleJobDescription = (jobId) => {
    setExpandedJobs(prev => ({...prev, [jobId]: !prev[jobId]}));
  };

  const truncateDescription = (description, lines = 2) => {
    const descriptionLines = description.split('\n');
    if (descriptionLines.length > lines) {
      return descriptionLines.slice(0, lines).join('\n') + '...';
    }
    return description;
  };

  const renderDescription = (description, isExpanded) => {
    const content = isExpanded ? description : truncateDescription(description);
    
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Replace URLs with anchor tags
    const htmlContent = content.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });

    // Replace newlines with <br> tags
    const formattedContent = htmlContent.replace(/\n/g, '<br>');
    
    return { __html: formattedContent };
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load jobs</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-2/3 border-2 border-black p-4 bg-white shadow-md">
          {jobs.map((job) => (
            <div key={job.id} className="mb-4">
              <Link href={`/job/${job.id}`}>
                <h2 className="text-2xl text-red-700 font-bold mb-3 hover:underline cursor-pointer">
                  {job.job_title}
                </h2>
              </Link>
              <p className="text-gray-800 text-xs mb-1">{job.organization}</p>
              <p className="text-gray-600 text-xs mb-3">Posted on: {formatDate(job.created_at)}</p>
              <div 
                className="whitespace-pre-wrap break-words text-sm text-black mb-3"
                style={{fontFamily: 'inherit'}}
                dangerouslySetInnerHTML={renderDescription(job.job_description, expandedJobs[job.id])}
              />
              <div className="text-right">
                {/* {expandedJobs[job.id] ? (
                  <button 
                    onClick={() => toggleJobDescription(job.id)} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Read Less
                  </button>
                ) : ()} */}
                  <Link  className="text-sm text-red-500 hover:text-red-700 hover:underline" href={`/job/${job.id}`}>
                      Read More...
                  </Link>
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
