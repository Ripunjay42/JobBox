import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loadingspin from '@/components/Loadingspin';

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
            className={`ml-4 px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLinks, setTotalLinks] = useState(0);
  const linksPerPage = 5;

  useEffect(() => {
    fetchLinks();
  }, [currentPage]);

  const fetchLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobbox-server-roan.vercel.app/api/links/delete', {
        params: {
          page: currentPage,
          limit: linksPerPage,
        },
      });
      setLinks(response.data.links);
      setTotalLinks(response.data.totalLinks);
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
        setTotalLinks(prevTotal => prevTotal - 1);
        setMessage('Link deleted successfully');
        setTimeout(() => setMessage(null), 3000);

        // Refetch links if the current page becomes empty
        if (links.length === 1 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        } else {
          fetchLinks();
        }
      } else {
        setError(`Failed to delete link: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <Loadingspin/>;
  // <p>Loading links...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteLinksList links={links} onDelete={handleDeleteLink} darkMode={darkMode} />
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-400 dark:bg-gray-400 text-black cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Prev page
        </button>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage * linksPerPage >= totalLinks}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage * linksPerPage >= totalLinks ? 'bg-gray-400 dark:bg-gray-400 text-black cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        > 
          Next page
        </button>
      </div>
    </div>
  );
};

export default DeleteLinks;