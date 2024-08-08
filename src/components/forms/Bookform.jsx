'use client';
import { useState } from 'react';
import axios from 'axios';
import './JobForm.css'; // Import the CSS file

const BookForm = () => {
  const initialBookState = {
    title: '',
    link: ''
  };

  const [book, setBook] = useState(initialBookState);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddMore = () => {
    setBook(initialBookState);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      
      if (response.status === 200) {
        setSuccessMessage('Book added successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding book. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          className="w-full px-2 py-2 border border-gray-300 rounded-md placeholder-text-sm"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Book Link"
          value={book.link}
          onChange={handleChange}
          className="w-full px-2 py-2 border border-gray-300 rounded-md placeholder-text-sm"
          required
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-3 py-1 text-white text-sm bg-red-600 rounded-md hover:bg-red-700"
        >
          Submit Book
        </button>
        <button
          type="button"
          onClick={handleAddMore}
          className="px-3 py-1 text-sm text-black border border-indigo-600 rounded-md hover:bg-indigo-50"
        >
          Add More
        </button>
      </div>
      
      {successMessage && (
        <div className="mt-4 p-2 text-sm bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mt-4 p-2 text-sm bg-red-100 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default BookForm;