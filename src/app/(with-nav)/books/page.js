'use client';
import { useContext } from 'react';
import { FaBookOpen, FaBookReader, FaBook } from 'react-icons/fa';
import Image from 'next/image';
import { JobContext } from '@/components/Jobcontext';
import Loadingspin from '@/components/Loadingspin';

const Books = () => {
  const { books, currentBooksPage, setCurrentBooksPage, booksPerPage, loading } = useContext(JobContext);

  const getRandomIcon = () => {
    const icons = [FaBookOpen, FaBookReader, FaBook];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  const paginate = (pageNumber) => {
    setCurrentBooksPage(pageNumber);
  };

  const prevButtonDisabled = currentBooksPage === 1 || loading;
  const nextButtonDisabled = !books.books || books.books.length < booksPerPage || loading ||  currentBooksPage * booksPerPage >= books.total;

  if (loading) return <Loadingspin/>
  // <div className='text-center dark:text-white'>Loading...</div>;
  if (!books.books || books.books.length === 0) return <div className='text-center dark:text-white'>No books available</div>;

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
        <h1 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg flex items-center justify-center">
            {/* Left SVG Icon (Book Icon) */}
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-16h-8m0 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8m0-16v16m8-16a2 2 0 012 2v12a2 2 0 01-2 2h-8" />
            </svg>

            {/* Title */}
            Books

            {/* Right SVG Icon (Open Book Icon) */}
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 4.5a2.5 2.5 0 00-2.5-2.5h-11A2.5 2.5 0 005 4.5v15A2.5 2.5 0 007.5 22h11a2.5 2.5 0 002.5-2.5v-15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2.5v19m8-19v19" />
            </svg>
          </h1>

          <div className="flex justify-center mb-8">
            <Image
              src="/book.jpg"
              alt="Book Library"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-3">
            {books.books.map((book) => {
              const Icon = getRandomIcon();
              return (
                <div
                  key={book.id}
                  className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 pb-2 mb-2"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="text-blue-500 dark:text-blue-400" />
                    <h2 className="text-sm text-red-700 dark:text-red-400 font-bold">{book.title}</h2>
                  </div>
                  <button
                    onClick={() => handleClick(book.link)}
                    className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs underline min-w-[100px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
                  >
                    Read More
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => paginate(currentBooksPage - 1)} 
              disabled={prevButtonDisabled}
              className={`px-3 py-1 text-sm font-bold rounded underline ${prevButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              {prevButtonDisabled ? 'No prev' : 'Prev page'}
            </button>
            <button 
              onClick={() => paginate(currentBooksPage + 1)} 
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

export default Books;