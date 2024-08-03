'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'GOV JOBS', href: '/' },
    { name: 'PRIVATE JOBS', href: '/' },
    { name: 'LINKS', href: '/links' },
    { name: 'BOOKS', href: '/' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  return (
    <div>
      <div className="bg-black text-white mt-1 text-center py-5 font-bold text-xl">
        JOBBOX.ORG.IN
      </div>
      <nav className="bg-red-900 relative mt-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-center h-8 md:h-10">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-black px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-1 rounded-md text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div 
            className="md:hidden absolute top-full left-0 right-0 z-50 bg-red-900 shadow-lg" 
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:bg-black block px-3 py-1 rounded-md text-xs font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;