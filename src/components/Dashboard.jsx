import { useState } from 'react';
import { FaBriefcase, FaLink, FaBook, FaUser, FaSun, FaMoon } from 'react-icons/fa';
import JobForm from './forms/JobForm';
import LinkForm from './forms/LinkForm';
import BookForm from './forms/BookForm';

const Card = ({ title, icon, onClick, darkMode }) => (
  <div
    onClick={onClick}
    className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
      darkMode ? 'bg-gray-900 text-gray-100 shadow-md' : 'bg-white text-black border-2 border-gray-500 shadow-md'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className={`text-4xl ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
        {icon}
      </div>
      <div className="text-sm font-bold">{title}</div>
    </div>
  </div>
);

const Dashboard = ({ user, onLogout }) => {
  const [activeForm, setActiveForm] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-gray-100' : 'bg-white text-black'}`}>
      <div
        className={`p-6 max-w-4xl mx-auto rounded-xl shadow-lg space-y-6 ${
          darkMode ? 'bg-black' : 'bg-white'
        }`}
      >
        <div
          className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-lg ${
            darkMode ? 'bg-gray-900' : 'bg-white border-2 border-gray-500'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-black'
              }`}
            >
              <FaUser className="text-xl" style={{ color: darkMode ? '#34D399' : '#34D399' }} />
            </div>
            <div>
              <div className="text-sm">Welcome,</div>
              <div className="text-lg font-bold" style={{ color: darkMode ? '#F87171' : '#F87171' }}>
                {user.username}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <button
              onClick={toggleDarkMode}
              className={`p-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'} transition duration-150 ease-in-out`}
            >
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>
            <button
              onClick={onLogout}
              className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${
                darkMode
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400'
                  : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              } text-white`}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Add Job" icon={<FaBriefcase />} onClick={() => setActiveForm('job')} darkMode={darkMode} />
          <Card title="Add Links" icon={<FaLink />} onClick={() => setActiveForm('links')} darkMode={darkMode} />
          <Card title="Add Books" icon={<FaBook />} onClick={() => setActiveForm('books')} darkMode={darkMode} />
        </div>

        {activeForm && (
          <div
            className={`w-full md:w-3/3 p-4 rounded-xl shadow-lg hover:shadow-xl ${
              darkMode ? 'bg-gray-900' : 'bg-white border-2 border-gray-500'
            }`}
          >
            <h3 className="text-lg font-bold mb-4">
              {`Add ${activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}`}
            </h3>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {activeForm === 'job' && <JobForm darkMode={darkMode}/>}
              {activeForm === 'links' && <LinkForm darkMode={darkMode} />}
              {activeForm === 'books' && <BookForm darkMode={darkMode}/>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
