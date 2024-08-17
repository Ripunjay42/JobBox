'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState({ jobs: [], totalJobs: 0 });
  const [govJobs, setGovJobs] = useState({ jobs: [], totalJobs: 0 });
  const [privateJobs, setPrivateJobs] = useState({ jobs: [], totalJobs: 0 });
  const [internJobs, setInternJobs] = useState({ jobs: [], totalJobs: 0 }); // New state for internships
  const [links, setLinks] = useState({ links: [], total: 0 });
  const [books, setBooks] = useState({ books: [], total: 0 });
  const [courses, setCourses] = useState({ courses: [], total: 0 }); // New state for courses
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentGovPage, setCurrentGovPage] = useState(1);
  const [currentPrivatePage, setCurrentPrivatePage] = useState(1);
  const [currentInternPage, setCurrentInternPage] = useState(1); // New state for current internship page
  const [currentLinksPage, setCurrentLinksPage] = useState(1);
  const [currentBooksPage, setCurrentBooksPage] = useState(1);
  const [currentCoursesPage, setCurrentCoursesPage] = useState(1); // New state for current courses page
  const [loading, setLoading] = useState(false);
  const jobsPerPage = 5;
  const linksPerPage = 6;
  const booksPerPage = 5;
  const coursesPerPage = 6; // Define coursesPerPage

  useEffect(() => {
    const fetchPaginatedData = async () => {
      setLoading(true);
      try {

        const jobsResponse = await axios.get('https://jobbox-server-roan.vercel.app/api/jobs', { params: { page: currentJobPage, limit: jobsPerPage } });
        setJobs(jobsResponse.data);

        const [
          govResponse,
          privateResponse,
          internResponse, // Fetching internship data
          linksResponse,
          bookResponse,
          courseResponse // Fetching courses data
        ] = await Promise.all([
          axios.get('https://jobbox-server-roan.vercel.app/api/gov', { params: { page: currentGovPage, limit: jobsPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/private', { params: { page: currentPrivatePage, limit: jobsPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/internships', { params: { page: currentInternPage, limit: jobsPerPage } }), // API call for internships
          axios.get('https://jobbox-server-roan.vercel.app/api/links', { params: { page: currentLinksPage, limit: linksPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/books', { params: { page: currentBooksPage, limit: booksPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/courses', { params: { page: currentCoursesPage, limit: coursesPerPage } }) // API call for courses
        ]);
        setGovJobs(govResponse.data);
        setPrivateJobs(privateResponse.data);
        setInternJobs(internResponse.data); // Setting internship data
        setLinks(linksResponse.data);
        setBooks(bookResponse.data);
        setCourses(courseResponse.data); // Setting courses data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedData();
  }, [currentJobPage, currentGovPage, currentPrivatePage, currentInternPage, currentLinksPage, currentBooksPage, currentCoursesPage]); // Added currentCoursesPage as a dependency

  return (
    <JobContext.Provider value={{
      jobs,
      govJobs,
      privateJobs,
      internJobs, // Added internship jobs to the context
      links,
      books,
      courses, // Added courses to the context
      currentJobPage,
      setCurrentJobPage,
      currentGovPage,
      setCurrentGovPage,
      currentPrivatePage,
      setCurrentPrivatePage,
      currentInternPage, // Added currentInternPage to the context
      setCurrentInternPage, // Added setCurrentInternPage to the context
      currentLinksPage,
      setCurrentLinksPage,
      currentBooksPage,
      setCurrentBooksPage,
      currentCoursesPage, // Added currentCoursesPage to the context
      setCurrentCoursesPage, // Added setCurrentCoursesPage to the context
      loading,
      jobsPerPage,
      linksPerPage,
      booksPerPage,
      coursesPerPage // Added coursesPerPage to the context
    }}>
      {children}
    </JobContext.Provider>
  );
};
