'use client';
import React, { useContext } from 'react';
import { JobContext } from '@/components/Jobcontext';
import Link from 'next/link';
import ImportantLinks from '@/components/ImportantLinks';
import RecentJobs from '@/components/RecentJobs';
import Loadingspin from '@/components/Loadingspin';

const PrivateJobPage = () => {
  const {
    privateJobs,
    currentPrivatePage,
    setCurrentPrivatePage,
    jobsPerPage,
    loading
  } = useContext(JobContext);

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
    setCurrentPrivatePage(pageNumber);
  };

  const prevButtonDisabled = currentPrivatePage === 1 || loading;
  const nextButtonDisabled = !privateJobs.jobs || privateJobs.jobs.length < jobsPerPage || loading || currentPrivatePage * jobsPerPage >= privateJobs.totalJobs;

  if (loading) return <Loadingspin/>
  // <div className='text-center dark:text-white'>Loading...</div>;
  if (!privateJobs.jobs || privateJobs.jobs.length === 0) return <div className='text-center dark:text-white'>No private jobs available</div>;

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
            {privateJobs.jobs.map((job) => (
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
                    <Link href={`/private_job`} className="text-sm text-blue-800 px-1 py-1 rounded-full hover:underline dark:text-blue-400">
                      Private
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
                onClick={() => !prevButtonDisabled && paginate(currentPrivatePage - 1)} 
                disabled={prevButtonDisabled}
                className={`px-3 py-1 text-sm font-bold rounded underline ${prevButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                {prevButtonDisabled ? 'No prev' : 'Prev page'}
              </button>
              <button 
                onClick={() => !nextButtonDisabled && paginate(currentPrivatePage + 1)} 
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

export default PrivateJobPage;