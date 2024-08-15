'use client';
import React, { useContext, useEffect } from 'react';
import { JobContext } from '@/components/Jobcontext';
import Link from 'next/link';
import ImportantLinks from '@/components/ImportantLinks';
import RecentJobs from '@/components/RecentJobs';
import Loadingspin from '@/components/Loadingspin';

const InternPage = () => {
  const {
    internJobs,
    currentInternPage,
    setCurrentInternPage,
    jobsPerPage,
    loading
  } = useContext(JobContext);

  useEffect(() => {
    console.log('Current Intern Page:', currentInternPage);
  }, [currentInternPage]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(internJobs.totalJobs / jobsPerPage)) {
      setCurrentInternPage(pageNumber);
    }
  };

  const prevButtonDisabled = currentInternPage === 1 || loading;
  const nextButtonDisabled = loading || currentInternPage * jobsPerPage >= internJobs.totalJobs;

  if (loading) return <Loadingspin />;
  if (!internJobs.jobs || internJobs.jobs.length === 0) {
    paginate(currentInternPage - 1);
    return <div className='text-center dark:text-white'>No internship jobs available</div>;
  }

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-2/3 border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center">
            {/* Left SVG Icon (Briefcase Icon) */}
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0h4M4 7h16M4 17h16M10 9V5a2 2 0 012-2h0a2 2 0 012 2v4m-8 4v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
            </svg>

            {/* Title */}
            Internships

            {/* Right SVG Icon (Clipboard Icon) */}
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M4 7h16M4 7v12a2 2 0 002 2h12a2 2 0 002-2V7M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
            </svg>
          </h2>

            {internJobs.jobs.map((job) => (
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
                  style={{ fontFamily: 'inherit' }}
                  dangerouslySetInnerHTML={renderDescription(job.job_description)}
                />
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <span className="text-sm text-green-900 font-bold mr-2 dark:text-green-400">Category:</span>
                    <Link href={`/internship`} className="text-sm text-blue-800 px-1 py-1 rounded-full hover:underline dark:text-blue-400">
                      Internship
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
                onClick={() => !prevButtonDisabled && paginate(currentInternPage - 1)} 
                disabled={prevButtonDisabled}
                className={`px-3 py-1 text-sm font-bold rounded underline ${prevButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                {prevButtonDisabled ? 'No prev' : 'Prev page'}
              </button>
              <button 
                onClick={() => !nextButtonDisabled && paginate(currentInternPage + 1)} 
                disabled={nextButtonDisabled}
                className={`px-3 py-1 text-sm font-bold rounded underline ${nextButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                {nextButtonDisabled ? 'No more' : 'Next page'}
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

export default InternPage;
