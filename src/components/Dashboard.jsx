// components/Dashboard.js
import { useState } from 'react';
import { FaBriefcase, FaLink, FaBook, FaUser } from 'react-icons/fa';
import JobForm from './forms/JobForm';
import LinkForm from './forms/LinkForm';
import BookForm from './forms/BookForm';

const Card = ({ title, icon, onClick }) => (
  <div onClick={onClick} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105">
    <div className="flex items-center space-x-4">
      <div className="text-4xl text-black">{icon}</div>
      <div className="text-l font-medium text-black">{title}</div>
    </div>
  </div>
);

const Dashboard = ({ user, onLogout }) => {
  const [activeForm, setActiveForm] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-black rounded-full">
            <FaUser className="text-xl text-white" />
          </div>
          <div>
            <div className="text-sm text-black">Welcome,</div>
            <div className="text-xl font-bold text-red-500">{user.username}</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Add Job" icon={<FaBriefcase />} onClick={() => setActiveForm('job')} />
        <Card title="Add Links" icon={<FaLink />} onClick={() => setActiveForm('links')} />
        <Card title="Add Books" icon={<FaBook />} onClick={() => setActiveForm('books')} />
      </div>

      {activeForm && (
        <div className="w-full md:w-2/3 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-black">{`Add ${activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}`}</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {activeForm === 'job' && <JobForm />}
            {activeForm === 'links' && <LinkForm />}
            {activeForm === 'books' && <BookForm />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
