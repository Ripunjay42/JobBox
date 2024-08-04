// components/ImportantLinks.js
'use client';
import React from 'react';
import Link from 'next/link';

const ImportantLinks = () => {
  // Example links - you'll replace this with data fetched from your database
  const links = [
    { title: "Latest Government Jobs", href: "/govt-jobs" },
    { title: "Private Sector Opportunities", href: "/private-jobs" },
    { title: "Job Seeker Resources", href: "/resources" },
    { title: "Career Development Tips", href: "/career-tips" },
    { title: "Interview Preparation", href: "/interview-prep" },
    { title: "Resume Writing Guide", href: "/resume-guide" },
    { title: "Assam Job Market Insights", href: "/job-market" },
    { title: "Employer Registration", href: "/employer-register" },
  ];

  return (
    <div className="border-2 border-black p-4">
      <div className="border border-gray-300 p-2 mb-2">
        <h2 className="font-semibold text-blue-600">Important Links</h2>
      </div>
      {links.map((link, index) => (
        <div key={index} className="border border-gray-300 p-2 mb-2">
          <Link href={link.href} className="text-blue-600 text-l hover:underline">
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ImportantLinks;