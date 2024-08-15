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
      <h1 className="text-xl font-bold text-center text-white mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 py-2 px-2 shadow-lg flex items-center justify-center">
          {/* Left SVG Icon (Phone Icon) */}
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h1.5a2 2 0 012 2v3.5a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm13.5 0a2 2 0 012-2h1.5a2 2 0 012 2v3.5a2 2 0 01-2 2H18a2 2 0 01-2-2V5zM9.172 16.828a4 4 0 010 5.656l-.172.172a2 2 0 01-2.828 0L3.879 19.88a2 2 0 010-2.828l.172-.172a4 4 0 015.656 0zm5.656-5.656a4 4 0 010 5.656l-.172.172a2 2 0 01-2.828 0L9.879 14.88a2 2 0 010-2.828l.172-.172a4 4 0 015.656 0z" />
          </svg>

          {/* Title */}
          Contact us

          {/* Right SVG Icon (Envelope Icon) */}
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12h.01M12 16h.01M8 12h.01M3 8l7.89 5.26c.12.08.26.12.39.12s.27-.04.39-.12L21 8m-18 0V6a2 2 0 012-2h14a2 2 0 012 2v2M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8" />
          </svg>
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
