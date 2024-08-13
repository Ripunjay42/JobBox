'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState({ jobs: [], totalJobs: 0 });
  const [govJobs, setGovJobs] = useState({ jobs: [], totalJobs: 0 });
  const [privateJobs, setPrivateJobs] = useState({ jobs: [], totalJobs: 0 });
  const [links, setLinks] = useState({links: [], total: 0});
  const [books, setBooks] = useState({books: [], total: 0});
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentGovPage, setCurrentGovPage] = useState(1);
  const [currentPrivatePage, setCurrentPrivatePage] = useState(1);
  const [currentLinksPage, setCurrentLinksPage] = useState(1);
  const [currentBooksPage, setCurrentBooksPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const jobsPerPage = 5;
  const linksPerPage = 6;
  const booksPerPage = 5;

  useEffect(() => {
    const fetchPaginatedData = async () => {
      setLoading(true);
      try {
        const [
          jobsResponse,
          govResponse,
          privateResponse,
          linksResponse,
          bookResponse
        ] = await Promise.all([
          axios.get('https://jobbox-server-roan.vercel.app/api/jobs', { params: { page: currentJobPage, limit: jobsPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/gov', { params: { page: currentGovPage, limit: jobsPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/private', { params: { page: currentPrivatePage, limit: jobsPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/links', { params: { page: currentLinksPage, limit: linksPerPage } }),
          axios.get('https://jobbox-server-roan.vercel.app/api/books', { params: { page: currentBooksPage, limit: booksPerPage } })
        ]);

        setJobs(jobsResponse.data);
        setGovJobs(govResponse.data);
        setPrivateJobs(privateResponse.data);
        setLinks(linksResponse.data);
        setBooks(bookResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedData();
  }, [currentJobPage, currentGovPage, currentPrivatePage, currentLinksPage, currentBooksPage]);

  return (
    <JobContext.Provider value={{
      jobs,
      govJobs,
      privateJobs,
      links,
      books,
      currentJobPage,
      setCurrentJobPage,
      currentGovPage,
      setCurrentGovPage,
      currentPrivatePage,
      setCurrentPrivatePage,
      currentLinksPage,
      setCurrentLinksPage,
      currentBooksPage,
      setCurrentBooksPage,
      loading,
      jobsPerPage,
      linksPerPage,
      booksPerPage
    }}>
      {children}
    </JobContext.Provider>
  );
};