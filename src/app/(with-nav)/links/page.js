'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LinksPage = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
    fetchLinks();
  }, []);

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="border-2 border-black dark:border-gray-600 p-4 bg-white dark:bg-gray-800 shadow-md dark:shadow-lg rounded-sm">
          <h1 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg">
            Important Links
          </h1>
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex justify-between items-center border-b dark:border-gray-600 border-gray-300 pb-2 mb-2"
              >
                <h2 className="text-sm text-red-700 dark:text-red-400 font-bold">{link.title}</h2>
                <button
                  onClick={() => handleClick(link.link)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs min-w-[80px] dark:bg-red-500 dark:hover:bg-red-600 text-animation"
                >
                  Click Here
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
