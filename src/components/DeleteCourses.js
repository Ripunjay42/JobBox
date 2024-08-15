import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loadingspin from '@/components/Loadingspin';

const DeleteCoursesList = ({ courses, onDelete, darkMode }) => {
  return (
    <div className={`space-y-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}>
      {courses.map(course => (
        <div key={course.id} className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold">{course.title}</h4>
            <a 
              href={course.link} 
              className="text-blue-500 underline text-xs break-words"
              style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }} 
            >
              {course.link}
            </a>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this course?')) {
                onDelete(course.id);
              }
            }} 
            className={`ml-4 px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const DeleteCourses = ({ darkMode }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const coursesPerPage = 5;

  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobbox-server-roan.vercel.app/api/courses/delete', {
        params: {
          page: currentPage,
          limit: coursesPerPage,
        },
      });
      setCourses(response.data.courses);
      setTotalCourses(response.data.totalCourses);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const id = parseInt(courseId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid course ID');
      }

      const response = await axios.delete(`https://jobbox-server-roan.vercel.app/api/courses/${id}`);
      if (response.status === 200) {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
        setTotalCourses(prevTotal => prevTotal - 1);
        setMessage('Course deleted successfully');
        setTimeout(() => setMessage(null), 3000);

        // Refetch courses if the current page becomes empty
        if (courses.length === 1 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        } else {
          fetchCourses();
        }
      } else {
        setError(`Failed to delete course: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Loadingspin/>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteCoursesList courses={courses} onDelete={handleDeleteCourse} darkMode={darkMode} />
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-400 dark:bg-gray-400 text-black cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Prev page
        </button>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage * coursesPerPage >= totalCourses}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage * coursesPerPage >= totalCourses ? 'bg-gray-400 dark:bg-gray-400 text-black cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        > 
          Next page
        </button>
      </div>
    </div>
  );
};

export default DeleteCourses;