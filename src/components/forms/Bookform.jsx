// components/forms/BookForm.js
'use client';
import { useState } from 'react';

const BookForm = () => {
  const [book, setBook] = useState({ title: '', author: '', isbn: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to submit book
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        console.log('Book added successfully');
        setBook({ title: '', author: '', isbn: '' });
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Book Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={book.isbn}
        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Submit Book
      </button>
    </form>
  );
};

export default BookForm;