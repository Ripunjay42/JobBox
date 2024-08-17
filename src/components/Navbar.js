'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  FaUserShield, FaMoon, FaSun, FaTimes, FaChevronDown, FaHome, 
  FaInfoCircle, FaBriefcase, FaBuilding, FaLink, FaBook, FaEnvelope, 
  FaEllipsisH, FaBars, FaUser, FaGraduationCap, FaLaptop 
} from 'react-icons/fa';
import Loadingscr from "@/components/Loading";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileDropdownRefs = useRef({});

  const navItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfoCircle },
    { name: 'Gov.Jobs', href: '/government', icon: FaBriefcase },
    { name: 'Pvt.Jobs', href: '/private', icon: FaBuilding },
    { name: 'Links', href: '/links', icon: FaLink },
    { name: 'Books', href: '/books', icon: FaBook },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
    {
      name: 'Others',
      icon: FaEllipsisH,
      dropdown: [
        { name: 'Employer', href: '/', icon: FaUser },
        { name: 'Internship', href: '/internship', icon: FaGraduationCap },
        { name: 'Courses', href: '/courses', icon: FaLaptop },
      ],
    },
  ];

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionLoaded = sessionStorage.getItem('sessionLoaded');
    
    if (!sessionLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('sessionLoaded', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  const handleDropdownToggle = (itemName) => {
    setDropdownOpen(dropdownOpen === itemName ? null : itemName);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && 
      !dropdownRef.current.contains(event.target) &&
      mobileMenuRef.current && 
      !mobileMenuRef.current.contains(event.target)
    ) {
      setDropdownOpen(null);
      setIsOpen(false);
    }

    // Handle mobile dropdown clicks
    navItems.forEach((item) => {
      if (item.dropdown) {
        const ref = mobileDropdownRefs.current[item.name];
        if (ref && !ref.contains(event.target)) {
          setDropdownOpen(null);
        }
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <>
      {loading ? (
        <Loadingscr/>
      ) : (
        <div>
          <div className="bg-black dark:bg-black mt-1 text-center py-5 font-bold text-2xl text-white">
            JOBBOX.ORG.IN
          </div>
          <nav className="bg-red-900 dark:bg-gray-900 relative mt-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
              <div className="flex items-center justify-between h-8 md:h-10">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="md:hidden flex items-center justify-center p-1 rounded-md text-white focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={isOpen}
                  >
                    {!isOpen ? (
                      <>
                        <FaBars className="h-5 w-5" />
                        <button className="ml-2 text-sm" onClick={() => setIsOpen(!isOpen)}>Main Menu</button>
                      </>
                    ) : (
                      <>
                        <FaTimes className="h-5 w-5" />
                        <span className="ml-2 text-sm">Main Menu</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="hidden md:flex space-x-2">
                    {navItems.map((item) => (
                      item.dropdown ? (
                        <div 
                          key={item.name} 
                          className="relative group"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={() => handleDropdownToggle(item.name)}
                            className="group relative text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs font-bold flex items-center"
                          >
                            <FaChevronDown className="mr-1 h-3 w-3" />
                            <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-white transition-all duration-200"></span>
                            {item.name}
                          </button>
                          {dropdownOpen === item.name && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="px-4 py-2 text-xs font-bold text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-black flex items-center"
                                    role="menuitem"
                                    onClick={() => setDropdownOpen(null)}
                                  >
                                    <dropdownItem.icon className="mr-2 h-3 w-3" />
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group relative text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs font-bold flex items-center"
                        >
                          <item.icon className="mr-1 h-3 w-3" />
                          <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-white transition-all duration-200"></span>
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={toggleDarkMode} className="text-white dark:text-red-600">
                    {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-4 w-5" />}
                  </button>
                  <Link href="/login">
                    <button className="bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-400 font-bold px-3 py-1 rounded-full text-xs flex items-center">
                      <FaUserShield className="mr-1" /> Admin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div
              ref={mobileMenuRef}
              className={`md:hidden fixed top-45 left-0 w-64 h-full bg-gray-900 dark:bg-black shadow-lg transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out z-50`}
              id="mobile-menu"
            >
              <div className="flex justify-end p-4 absolute top-0 right-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.name}>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="text-white dark:text-gray-300 px-3 py-2 rounded-md text-xs font-bold border-b border-white dark:border-gray-700 w-full mb-3 text-left flex items-center justify-between"
                      >
                        <span className="flex items-center">
                          <item.icon className="mr-2 h-3 w-3" />
                          {item.name}
                        </span>
                        <FaChevronDown className="h-3 w-3" />
                      </button>
                      {dropdownOpen === item.name && (
                        <div className="pl-4">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="text-white dark:text-gray-300 px-3 py-2 rounded-md text-xs font-bold border-b border-white dark:border-gray-700 w-full mb-3 text-left flex items-center"
                              onClick={() => {
                                setIsOpen(false);
                                setDropdownOpen(null);
                              }}
                            >
                              <dropdownItem.icon className="mr-2 h-3 w-3" />
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white dark:text-gray-300 px-3 py-2 rounded-md text-xs font-medium border-b border-white dark:border-gray-700 w-full mb-3 text-left flex items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <item.icon className="mr-2 h-3 w-3" />
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={toggleDarkMode}
                    className="text-white dark:text-red-600 p-2 rounded-md"
                  >
                    {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-4 w-5" />}
                  </button>
                  <Link href="/login">
                    <button
                      className="bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-400 font-bold px-2 py-1 rounded-full text-xs flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUserShield className="mr-1" /> Admin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
