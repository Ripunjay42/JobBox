'use client';
import { useState } from 'react';
import axios from 'axios';
import './JobForm.css'; // Ensure this file supports dark mode if used

const CourseForm = ({ darkMode }) => {
  const initialCourseState = {
    title: '',
    link: ''
  };

  const [course, setCourse] = useState(initialCourseState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleAddMore = () => {
    setCourse(initialCourseState);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jobbox-server-roan.vercel.app/api/courses', course);
      
      if (response.status === 200) {
        setSuccessMessage('Course added successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding course. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'}`}>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={course.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md placeholder-text-sm`}
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Course URL"
          value={course.link}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md placeholder-text-sm`}
          required
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`px-3 py-1 text-sm rounded-md hover:bg-red-700 ${darkMode ? 'bg-red-500 text-white' : 'bg-red-600 text-white'}`}
        >
          Submit Course
        </button>
        <button
          type="button"
          onClick={handleAddMore}
          className={`px-3 py-1 text-sm rounded-md border ${darkMode ? 'border-indigo-600 text-white hover:bg-indigo-700' : 'border-indigo-600 text-black hover:bg-indigo-50'}`}
        >
          Add More
        </button>
      </div>
      
      {successMessage && (
        <div className={`mt-4 p-2 text-sm rounded-md ${darkMode ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-700'}`}>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className={`mt-4 p-2 text-sm rounded-md ${darkMode ? 'bg-red-700 text-red-100' : 'bg-red-100 text-red-700'}`}>
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default CourseForm;