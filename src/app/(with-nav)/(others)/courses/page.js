'use client';
import React, { useContext } from 'react';
import { JobContext } from '@/components/Jobcontext'; // Make sure you have this context set up
import Loadingspin from '@/components/Loadingspin';

const CoursesPage = () => {
  const {
    courses,
    currentCoursesPage,
    setCurrentCoursesPage,
    coursesPerPage,
    loading
  } = useContext(JobContext);

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  const paginate = (pageNumber) => {
    setCurrentCoursesPage(pageNumber);
  };

  const prevButtonDisabled = currentCoursesPage === 1 || loading;
  const nextButtonDisabled = !courses.courses || courses.courses.length < coursesPerPage || loading || currentCoursesPage * coursesPerPage >= courses.total;

  if (loading) return <Loadingspin />;
  if (!courses.courses || courses.courses.length === 0) return <div className='text-center dark:text-white'>No courses available</div>;

  return (
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
          <h2 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-green-500 to-blue-400 dark:from-green-600 dark:to-blue-500 py-2 px-2 shadow-lg flex items-center justify-center">
            {/* Left SVG Icon (Book Icon) */}
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19.5V5a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2zm0 0l6-6M12 19.5l6-6" />
            </svg>

            {/* Title */}
            Courses

            {/* Right SVG Icon (Certificate Icon) */}
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 12l4 4m0 0l-4 4m4-4H3m12 0l-4-4m0 0l4-4m-4 4h14" />
            </svg>
          </h2>

          <div className="space-y-3">
            {courses.courses.map((course) => (
              <div
                key={course.id}
                className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 pb-2 mb-2"
              >
                <h2 className="text-sm text-blue-700 dark:text-blue-400 font-bold">{course.title}</h2>
                <button
                  onClick={() => handleClick(course.link)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md  underline hover:bg-red-700 text-xs min-w-[100px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
                >
                  View Course
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => paginate(currentCoursesPage - 1)}
              disabled={prevButtonDisabled}
              className={`px-3 py-1 text-sm font-bold rounded underline ${prevButtonDisabled ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              {prevButtonDisabled ? 'No prev' : 'Prev page'}
            </button>
            <button
              onClick={() => paginate(currentCoursesPage + 1)}
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

export default CoursesPage;
