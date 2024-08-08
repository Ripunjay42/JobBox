'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookOpen, FaBookReader, FaBook } from 'react-icons/fa';
import Image from 'next/image';

const LinksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const getRandomIcon = () => {
    const icons = [FaBookOpen, FaBookReader, FaBook];
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="border-2 border-black p-4 bg-white shadow-md">
        <h1 className="text-xl text-center text-black underline font-bold mb-4">
          BOOKS
        </h1>
        <div className="flex justify-center mb-8">
          <Image
            src="/book.jpg" // Test with this placeholder
            alt="Book Library"
            width={600}
            height={400}
          />
        </div>
        <div className="space-y-3">
          {books.map((book) => {
            const Icon = getRandomIcon();
            return (
              <div
                key={book.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="text-blue-500" />
                  <h2 className="text-sm text-red-700 font-bold">{book.title}</h2>
                </div>
                <button
                  onClick={() => handleClick(book.link)}
                  className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs underline min-w-[80px]"
                >
                  Read More
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
