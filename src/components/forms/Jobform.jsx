// components/forms/JobForm.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import './JobForm.css'; // Import the CSS file

const JobForm = () => {
  const initialJobState = {
    job_title: '',
    organization: '',
    job_description: ''
  };

  const [job, setJob] = useState(initialJobState);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleAddMore = () => {
    setJob(initialJobState);
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', job);
      
      if (response.status === 200) {
        setSuccessMessage('Job added successfully!');
      }
    } catch (error) {
      console.error('Error adding job:', error);
      setSuccessMessage('Error adding job. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          name="job_title"
          placeholder="Job Title"
          value={job.job_title}
          onChange={handleChange}
          className="w-full px-2 py-2 border border-gray-300 rounded-md placeholder-text-sm"
          required
        />
        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={job.organization}
          onChange={handleChange}
          className="w-full px-2 py-2 border border-gray-300 rounded-md placeholder-text-sm"
          required
        />
        <textarea
          name="job_description"
          placeholder="Job Description"
          value={job.job_description}
          onChange={handleChange}
          className="w-full px-2 py-2 border border-gray-300 rounded-md placeholder-text-sm"
          rows="30"
          required
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Submit Job
        </button>
        <button
          type="button"
          onClick={handleAddMore}
          className="px-4 py-2 text-black border border-indigo-600 rounded-md hover:bg-indigo-50"
        >
          Add More
        </button>
      </div>
      
      {successMessage && (
        <div className="mt-4 p-2 text-sm bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
    </form>
  );
};

export default JobForm;
