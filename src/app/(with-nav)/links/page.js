'use client';
import React, { useContext } from 'react';
import { JobContext } from '@/components/Jobcontext';

const LinksPage = () => {
  const {
    links,
    currentLinksPage,
    setCurrentLinksPage,
    linksPerPage,
    loading
  } = useContext(JobContext);

 // Match this with the limit in your API call

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  const paginate = (pageNumber) => {
    setCurrentLinksPage(pageNumber);
  };

  const prevButtonDisabled = currentLinksPage === 1 || loading;
  const nextButtonDisabled = !links.links || links.links.length < linksPerPage || loading || currentLinksPage * linksPerPage >= links.total;

  if (loading) return <div className='text-center dark:text-white'>Loading...</div>;
  if (!links.links || links.links.length === 0) return <div className='text-center dark:text-white'>No links available</div>;
  
  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
          <h1 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg">
            Important Links
          </h1>
          <div className="space-y-3">
            {links.links.map((link) => (
              <div
                key={link.id}
                className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 pb-2 mb-2"
              >
                <h2 className="text-sm text-red-700 dark:text-red-400 font-bold">{link.title}</h2>
                <button
                  onClick={() => handleClick(link.link)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs min-w-[80px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
                >
                  Click Here
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => paginate(currentLinksPage - 1)}
              disabled={prevButtonDisabled}
              className={`px-3 py-1 text-sm font-bold rounded underline ${prevButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              {prevButtonDisabled ? 'No prev' : 'Prev page'}
            </button>
            <button
              onClick={() => paginate(currentLinksPage + 1)}
              disabled={nextButtonDisabled}
              className={`px-3 py-1 text-sm font-bold rounded underline ${nextButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              {nextButtonDisabled ? 'No more' : 'Next page'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;