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
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="border-2 border-black p-4">
      <div className="border border-gray-300 p-2 mb-2">
        <h2 className="font-semibold text-black text-2xl">Important Links</h2>
      </div>
      {links.map((link) => (
        <div key={link.id} className="border border-gray-300 p-2 mb-2">
          <Link href={link.link} target="_blank" className="text-red-600 text-sm hover:underline">
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ImportantLinks;