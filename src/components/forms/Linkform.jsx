// components/forms/LinkForm.js
'use client';
import { useState } from 'react';

const LinkForm = () => {
  const [link, setLink] = useState({ title: '', url: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to submit link
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link),
      });
      if (response.ok) {
        console.log('Link added successfully');
        setLink({ title: '', url: '' });
      }
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Link Title"
        value={link.title}
        onChange={(e) => setLink({ ...link, title: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={link.url}
        onChange={(e) => setLink({ ...link, url: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
      />
      <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
        Submit Link
      </button>
    </form>
  );
};

export default LinkForm;