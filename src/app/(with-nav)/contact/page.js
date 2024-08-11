'use client';
import { FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineLink } from 'react-icons/ai'

const ContactUsPage = () => {
  const contactDetails = [
    {
      id: 1,
      title: 'Email Us',
      info: 'info@jobbox.org.in',
      link: 'mailto:info@jobbox.org.in',
      icon: <FaEnvelope className="text-red-600" />, // Email icon in red
    },
    {
      id: 2,
      title: 'Follow us on X',
      info: '@JobBox',
      link: 'https://twitter.com/JobBox',
      icon: <FaXTwitter className="text-gray-900 dark:text-gray-400" />, // X (Twitter) icon in blue
    },
    {
      id: 3,
      title: 'Follow us on Instagram',
      info: '@JobBoxInsta',
      link: 'https://www.instagram.com/JobBoxInsta/',
      icon: <FaInstagram className="text-pink-500" />, // Instagram icon in pink
    },
    {
      id: 4,
      title: 'Call Us',
      info: '+91 1234567890',
      link: 'tel:+911234567890',
      icon: <FaPhoneAlt className="text-green-500" />, // Phone icon in green
    },
    {
      id: 5,
      title: 'Connect on LinkedIn',
      info: 'JobBox',
      link: 'https://www.linkedin.com/company/jobbox/',
      icon: <FaLinkedin className="text-blue-700" />, // LinkedIn icon in dark blue
    },
  ];

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="bg-gray-100 dark:bg-black flex items-center justify-center p-4">
      <div className="border-2 border-gray-700 dark:border-gray-600 max-w-lg w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-6">
          Contact Us
        </h1>
        <div className="space-y-4">
          {contactDetails.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between border bg-gray-300 dark:bg-gray-900 border-gray-300 dark:border-gray-600 p-2 mb-2 rounded-md transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <div className="flex items-center space-x-3">
                {contact.icon && (
                  <div className="text-2xl">
                    {contact.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-md font-bold text-gray-800 dark:text-gray-200">
                    {contact.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {contact.info}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleClick(contact.link)}
                className="flex items-center text-red-700 dark:text-red-500 hover:underline text-md"
              >
                <AiOutlineLink className="mr-2 text-xl text-red-700" />{/* Index finger icon */}
                {contact.title.includes('Email') || contact.title.includes('Call') ? 'Contact' : 'Visit'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
