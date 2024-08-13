import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteBooksList = ({ books, onDelete, darkMode }) => {
  return (
    <div className={`space-y-4 ${darkMode ? 'text-gray-100' : 'text-black'}`}>
      {books.map(book => (
        <div key={book.id} className={`flex justify-between items-center p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold">{book.title}</h4>
            <a 
              href={book.link} 
              className="text-blue-500 underline text-sm break-words"
              style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }} 
            >
              {book.link}
            </a>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this book?')) {
                onDelete(book.id);
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

const DeleteBooks = ({ darkMode }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = 5;

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jobbox-server-roan.vercel.app/api/books/delete', {
        params: {
          page: currentPage,
          limit: booksPerPage,
        },
      });
      setBooks(response.data.books);
      setTotalBooks(response.data.totalBooks);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const id = parseInt(bookId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid book ID');
      }

      const response = await axios.delete(`https://jobbox-server-roan.vercel.app/api/books/${id}`);
      if (response.status === 200) {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        setTotalBooks(prevTotal => prevTotal - 1);
        setMessage('Book deleted successfully');
        setTimeout(() => setMessage(null), 3000);

        // Refetch books if the current page becomes empty
        if (books.length === 1 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        } else {
          fetchBooks();
        }
      } else {
        setError(`Failed to delete book: ${response.data.message}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <DeleteBooksList books={books} onDelete={handleDeleteBook} darkMode={darkMode} />
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Prev page
        </button>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage * booksPerPage >= totalBooks}
          className={`px-3 py-1 text-sm font-bold rounded underline ${currentPage * booksPerPage >= totalBooks ? 'bg-gray-300 dark:bg-gray-700 text-white cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;