// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black mt-auto animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-2 border-gray-600 dark:border-gray-700">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slideUp">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">JobBox.org.in is a leading job portal in Assam, providing the latest job opportunities across various sectors.</p>
            </div>
            <div className="animate-slideUp">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm">
                <li className="mb-2"><Link href="/" className="hover:text-gray-600 dark:hover:text-gray-400">Home</Link></li>
                <li className="mb-2"><Link href="/about" className="hover:text-gray-600 dark:hover:text-gray-400">About</Link></li>
                <li className="mb-2"><Link href="/government_job" className="hover:text-gray-600 dark:hover:text-gray-400">Government Jobs</Link></li>
                <li className="mb-2"><Link href="/private_job" className="hover:text-gray-600 dark:hover:text-gray-400">Private Jobs</Link></li>
                <li><Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-400">Contact Us</Link></li>
              </ul>
            </div>
            <div className="animate-slideUp">
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <p className="text-sm mb-2">Email: info@jobbox.org.in</p>
              <p className="text-sm mb-2">Phone: +91 1234567890</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-pink-500 hover:text-pink-600 text-2xl transform transition-transform duration-300 hover:scale-110">
                  <FaInstagram />
                </a>
                <a href="#" className="text-black dark:text-gray-500 hover:text-black text-2xl transform transition-transform duration-300 hover:scale-110">
                  <FaXTwitter />
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl transform transition-transform duration-300 hover:scale-110">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t-2 border-gray-400 dark:border-gray-700 text-sm text-center">
            <p>&copy; 2024 JobBox.org.in. All rights reserved.</p>
            <p className="mt-2 flex items-center justify-center">
              Developed by <a href="https://www.linkedin.com/in/ripunjay-choudhury-83864524b/" className="font-medium hover:underline ml-1">Ripunjay Choudhury</a>
              <a href="https://www.linkedin.com/in/ripunjay-choudhury-83864524b/" target='_blank' className="text-blue-600 hover:text-blue-700 text-xl ml-2 transform transition-transform duration-300 hover:scale-110">
                <FaLinkedin />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
