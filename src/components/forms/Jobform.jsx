'use client';
import { useState } from 'react';
import axios from 'axios';
import './JobForm.css'; // Ensure this file also supports dark mode if used

const JobForm = ({ darkMode }) => {
  const initialJobState = {
    job_title: '',
    organization: '',
    job_description: '',
    category: ''
  };

  const [job, setJob] = useState(initialJobState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleAddMore = () => {
    setJob(initialJobState);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', job);
      
      if (response.status === 200) {
        setSuccessMessage('Job added successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding job. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'} p-6 rounded-lg shadow-md`}>
      <div className="space-y-4">
        <input
          type="text"
          name="job_title"
          placeholder="Job Title"
          value={job.job_title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md placeholder-text-sm`}
          required
        />
        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={job.organization}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md placeholder-text-sm`}
          required
        />
        <select
          name="category"
          value={job.category}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md text-sm`}
          required
        >
          <option value="">Select Job Category</option>
          <option value="private">Private Job</option>
          <option value="government">Government Job</option>
        </select>
        <textarea
          name="job_description"
          placeholder="Job Description"
          value={job.job_description}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-md placeholder-text-sm`}
          rows="30"
          required
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`px-3 py-1 text-sm rounded-md hover:bg-red-700 ${darkMode ? 'bg-red-500 text-white' : 'bg-red-600 text-white'}`}
        >
          Submit Job
        </button>
        <button
          type="button"
          onClick={handleAddMore}
          className={`px-3 py-1 text-sm rounded-md hover:bg-indigo-50 ${darkMode ? 'border-indigo-600 hover:bg-indigo-700 text-white' : 'border-indigo-600 text-black'} border`}
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

export default JobForm;
