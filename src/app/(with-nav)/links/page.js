// pages/LinksPage.js
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
    <div className="max-w-3xl mx-auto p-4">
      <div className="border-2 border-black p-4 bg-white shadow-md">
        <h1 className="text-xl text-center text-black underline font-bold mb-4">IMPORTANT LINKS</h1>
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex justify-between items-center">
              <h2 className="text-sm text-red-700 font-bold">{link.title}</h2>
              <button
                onClick={() => handleClick(link.link)}
                className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs underline min-w-[80px]"
              >
                Click Here
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksPage;