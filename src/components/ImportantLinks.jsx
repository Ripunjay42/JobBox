'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const ImportantLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        const lastTenLinks = response.data.slice(-10).reverse();
        setLinks(lastTenLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="border-2 border-black p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="border border-gray-300 p-2 mb-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 hover:from-purple-600 hover:to-indigo-500">
        <h2 className="font-bold text-white text-lg text-center animate-pulse">Important Links</h2>
      </div>
      {links.map((link, index) => (
        <div 
          key={link.id} 
          className="border bg-gray-200 border-gray-300 p-2 mb-2 rounded-md transition-all duration-300 hover:bg-gray-100 hover:shadow-md transform hover:-translate-y-0.5"
          style={{animationDelay: `${index * 100}ms`}}
        >
          <Link 
            href={link.link} 
            target="_blank" 
            className="text-red-600 text-sm hover:underline transition-colors duration-300 hover:text-red-800"
          >
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ImportantLinks;