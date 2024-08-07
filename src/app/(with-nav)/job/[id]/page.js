// app/job/[id]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ImportantLinks from '@/components/ImportantLinks';

const JobDetail = ({ params }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${params.id}`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load job details</div>;
  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Job Listings</h1> */}
        <div className="border-2 border-black p-4 bg-white shadow-md">
          <h1 className="text-2xl text-red-700 font-bold mb-3">{job.job_title}</h1>
          <p className="text-gray-800 text-xs mb-1">{job.organization}</p>
          <p className="text-gray-600 text-xs mb-3">Posted on: {formatDate(job.created_at)}</p>
          <div 
            className="whitespace-pre-wrap break-words text-sm text-black mb-3"
            style={{ fontFamily: 'inherit' }}
            dangerouslySetInnerHTML={renderDescription(job.job_description)}
          />
          <Link href="/" className="text-l text-red-500 hover:text-red-700 hover:underline">
            Back to Job Listings...
          </Link>
        </div>
    </div>
  );
};

export default JobDetail;
