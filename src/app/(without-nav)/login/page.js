'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai'; // Import the home icon
import Dashboard from '@/components/Dashboard';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);
  }, []);

  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   localStorage.setItem('darkMode', newDarkMode);
  //   document.documentElement.classList.toggle('dark', newDarkMode);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { message, user } = response.data;
      setUser(user);
      setError('');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} darkMode={darkMode} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black relative">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <Link href="/">
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-red-500 dark:hover:bg-red-600">
            <AiFillHome className="w-6 h-6" aria-hidden="true" />
          </button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-8 text-red-600 dark:text-red-400">JOBBOX.ORG.IN</h1>
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_70px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_50px_rgba(255,255,255,0.1)]">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">Admin Login</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Only authorized personnel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-200 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            />
          </div>
          {error && <p className="text-red-600 dark:text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400 dark:focus:border-red-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
