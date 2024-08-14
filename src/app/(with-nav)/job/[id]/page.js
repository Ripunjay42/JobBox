'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Loadingspin from '@/components/Loadingspin';

const JobDetail = ({ params }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://jobbox-server-roan.vercel.app/api/jobs/${params.id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderDescription = (description) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const htmlContent = description.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${url}</a>`;
    });
    const formattedContent = htmlContent.replace(/\n/g, '<br>');
    return { __html: formattedContent };
  };

  if (loading) return <Loadingspin/>;
  // <div className='text-center text-black dark:text-white'>Loading...</div>;
  if (error) return <div className='text-center text-black dark:text-white'>Failed to load job details</div>;
  if (!job) return null;

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
          <h1 className="text-2xl text-red-700 dark:text-red-400 font-bold mb-3">
            {job.job_title}
          </h1>
          <p className="text-gray-800 dark:text-gray-300 font-bold text-xs mb-1">
            {job.organization}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-bold text-xs mb-3">
            Posted on: {formatDate(job.created_at)}
          </p>
          <div 
            className="whitespace-pre-wrap break-words text-sm dark:text-gray-200 mb-3"
            style={{ fontFamily: 'inherit' }}
            dangerouslySetInnerHTML={renderDescription(job.job_description)}
          />
          <Link href="/" className="text-sm text-red-600 dark:text-red-500 font-bold hover:text-red-700 dark:hover:text-red-400 hover:underline">
            Back to Job Listings...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
