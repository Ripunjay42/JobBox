import { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaLink, FaBook, FaUser, FaSun, FaMoon, FaTrash, FaGraduationCap } from 'react-icons/fa';
import JobForm from '@/components/Jobform';
import LinkForm from './Linkform';
import BookForm from './Bookform';
import CourseForm from './Courseform';
import DeleteJob from './DeleteJob';
import DeleteLinks from './DeleteLinks';
import DeleteBooks from './DeleteBooks';
import DeleteCourses from './DeleteCourses';

const Card = ({ title, icon, onClick, darkMode }) => (
  <div
    onClick={onClick}
    className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
      darkMode ? 'bg-gray-900 text-gray-100 shadow-md' : 'bg-white text-black border-2 border-gray-500 shadow-md'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className={`text-3xl ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
        {icon}
      </div>
      <div className="text-sm font-bold">{title}</div>
    </div>
  </div>
);

const Dashboard = ({ user, onLogout }) => {
  const [activeForm, setActiveForm] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const activeFormRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleCardClick = (formName) => {
    setActiveForm(formName);
    setTimeout(() => {
      if (activeFormRef.current) {
        activeFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-gray-100' : 'bg-white text-black'}`}>
      <div
        className={`p-6 max-w-5xl mx-auto rounded-xl shadow-lg space-y-6 ${
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          <Card title="Add Job" icon={<FaBriefcase />} onClick={() => handleCardClick('add Job')} darkMode={darkMode} />
          <Card title="Add Links" icon={<FaLink />} onClick={() => handleCardClick('add Links')} darkMode={darkMode} />
          <Card title="Add Books" icon={<FaBook />} onClick={() => handleCardClick('add Books')} darkMode={darkMode} />
          <Card title="Add Courses" icon={<FaGraduationCap />} onClick={() => handleCardClick('add Courses')} darkMode={darkMode} />
          <Card title="Delete Job" icon={<FaTrash />} onClick={() => handleCardClick('delete Job')} darkMode={darkMode} />
          <Card title="Delete Links" icon={<FaTrash />} onClick={() => handleCardClick('delete Links')} darkMode={darkMode} />
          <Card title="Delete Books" icon={<FaTrash />} onClick={() => handleCardClick('delete Books')} darkMode={darkMode} />
          <Card title="Delete Courses" icon={<FaTrash />} onClick={() => handleCardClick('delete Courses')} darkMode={darkMode} />
        </div>

        {activeForm && (
          <div
            ref={activeFormRef}
            className={`max-w-5xl p-4 rounded-xl shadow-lg hover:shadow-xl mt-8 ${
              darkMode ? 'bg-gray-900' : 'bg-white border-2 border-gray-500'
            }`}
          >
            <h3 className="text-lg font-bold mb-4">
              {`${activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}`}
            </h3>
            <div
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {activeForm === 'add Job' && <JobForm darkMode={darkMode}/>}
              {activeForm === 'add Links' && <LinkForm darkMode={darkMode} />}
              {activeForm === 'add Books' && <BookForm darkMode={darkMode}/>}
              {activeForm === 'add Courses' && <CourseForm darkMode={darkMode}/>}
              {activeForm === 'delete Job' && <DeleteJob darkMode={darkMode} />}
              {activeForm === 'delete Links' && <DeleteLinks darkMode={darkMode} />}
              {activeForm === 'delete Books' && <DeleteBooks darkMode={darkMode} />}
              {activeForm === 'delete Courses' && <DeleteCourses darkMode={darkMode} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;