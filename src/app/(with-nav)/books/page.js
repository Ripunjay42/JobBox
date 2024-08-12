'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBookOpen, FaBookReader, FaBook } from 'react-icons/fa';
import Image from 'next/image';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://jobbox-server-roan.vercel.app/api/books');
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
    <div className="bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-sm">
          <h1 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg">
            Books
          </h1>
          <div className="flex justify-center mb-8">
            <Image
              src="/book.jpg" // Placeholder image
              alt="Book Library"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-3">
            {books.map((book) => {
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
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs underline min-w-[80px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
                  >
                    Read More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
