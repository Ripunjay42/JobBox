
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteLinksList = ({ links, onDelete, darkMode }) => {
    return (
      <div className={`space-y-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}>
        {links.map(link => (
          <div key={link.id} className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold">{link.title}</h4>
              <a 
                href={link.link} 
                className="text-blue-500 underline text-xs break-words"
                style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }} 
              >
                {link.link}
              </a>
            </div>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this link?')) {
                  onDelete(link.id);
                }
              }} 
              className={`ml-4 px-3 py-1 rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  };

const DeleteLinks = ({ darkMode }) => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobbox-server-roan.vercel.app/api/links');
      setLinks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      const id = parseInt(linkId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid link ID');
      }

      const response = await axios.delete(`https://jobbox-server-roan.vercel.app/api/links/${id}`);
      if (response.status === 200) {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
        setMessage('Link deleted successfully');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(`Failed to delete link: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (isLoading) return <p>Loading links...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteLinksList links={links} onDelete={handleDeleteLink} darkMode={darkMode} />
    </div>
  );
};

export default DeleteLinks;
