// pages/about.js
'use client';
import React from 'react';
import ImportantLinks from '@/components/ImportantLinks';
import RecentJobs from '@/components/RecentJobs';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white"> {/* Ensure full page background */}
      <div className="max-w-4xl mx-auto p-4  dark:text-white">
        {/* <h1 className="text-2xl font-bold mb-4">About</h1> */}
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-2/3 border-2 border-black dark:border-gray-600 p-4 dark:bg-gray-800">
            <p className="mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">JobBox.org.in</span> is a popular job portal in Assam, India. The website provides information on various job vacancies in government, private, and other sectors across Assam.
            </p>
            <p className="mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">JobBox.org.in</span> allows job seekers to search for jobs based on their preferred location, job category, and experience level. It also provides guidance on resume writing, interview tips, and career development. The website is regularly updated with new job listings, making it a go-to platform for job seekers in Assam.
            </p>
            <p className="mb-4">
              Overall, <span className="text-blue-600 dark:text-blue-400 font-semibold">JobBox.org.in</span> is a reliable source of information for job seekers in Assam looking for employment opportunities in various sectors.
            </p>
            <p className="mt-8 dark:text-white">
              Note: The <strong>JobBox™</strong> and the <strong>JobBox logo</strong> are <strong>registered trademarks</strong> of JobBox.org.in in India. You agree that all such trademarks, trade names, service marks and other logos and brand features, and product and service names are trademarks and the property of JobBox.org.in. Without prior written permission, you agree not to display or use the <strong>JobBox</strong> Marks in any manner.
            </p>
          </div>
          
          <div className="md:w-1/3 flex flex-col gap-1">
            <ImportantLinks />
            <RecentJobs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
