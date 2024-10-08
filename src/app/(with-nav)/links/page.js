'use client';
import React, { useContext } from 'react';
import { JobContext } from '@/components/Jobcontext';
import Loadingspin from '@/components/Loadingspin';

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

  if (loading) return <Loadingspin/>;
  // <div className='text-center dark:text-white'>Loading...</div>;
  if (!links.links || links.links.length === 0) return <div className='text-center dark:text-white'>No links available</div>;
  
  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
        <h2 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg flex items-center justify-center">
            {/* Left SVG Icon (Link Icon) */}
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.586a2 2 0 010-2.828l4-4a2 2 0 012.828 0l1.414 1.414M14 10h4.414a2 2 0 010 2.828l-4 4a2 2 0 01-2.828 0l-1.414-1.414" />
            </svg>

            {/* Title */}
            Important Links

            {/* Right SVG Icon */}
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
          </svg>
          </h2>



          <div className="space-y-3">
            {links.links.map((link) => (
              <div
                key={link.id}
                className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 pb-2 mb-2"
              >
                <h2 className="text-sm text-red-700 dark:text-red-400 font-bold">{link.title}</h2>
                <button
                  onClick={() => handleClick(link.link)}
                  className="px-2 py-1 bg-red-600 text-white underline rounded-md hover:bg-red-700 text-xs min-w-[100px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
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