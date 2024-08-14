'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUserShield, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import Loadingscr from "@/components/Loading";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'GOV JOBS', href: '/government_job' },
    { name: 'PRIVATE JOBS', href: '/private_job' },
    { name: 'IMP LINKS', href: '/links' },
    { name: 'BOOKS', href: '/books' },
    { name: 'CONTACT US', href: '/contact' },
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
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);

    const sessionLoaded = sessionStorage.getItem('sessionLoaded');
    
    if (!sessionLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('sessionLoaded', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
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
                        <svg
                          className="h-5 w-5"
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
                        <span className="ml-2 text-xs">Main Menu</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5"
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
                        <span className="ml-2 text-xs">Main Menu</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group relative text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-white transition-all duration-200"></span>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className="mr-1 text-xl" style={{ color: 'red' }} /> : <FaMoon className="mr-1 text-xl" style={{ color: 'black' }} />}
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
            className={`md:hidden fixed top-45 left-0 w-64 h-full bg-black dark:bg-gray-900 shadow-lg transform ${
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
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white dark:text-gray-300 block px-3 py-2 rounded-md text-xs font-medium border-b border-white dark:border-gray-700 w-full mb-3 text-left"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/login" className="w-full">
                <button
                  className="bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-400 font-bold px-3 py-1 rounded-full text-xs flex items-center mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserShield className="mr-1" /> Admin
                </button>
              </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;









// 'use client';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { FaUserShield, FaMoon, FaSun } from 'react-icons/fa';
// import Loadingscr from "@/components/Loading";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const navItems = [
//     { name: 'HOME', href: '/' },
//     { name: 'ABOUT', href: '/about' },
//     { name: 'GOV JOBS', href: '/government_job' },
//     { name: 'PRIVATE JOBS', href: '/private_job' },
//     { name: 'IMP LINKS', href: '/links' },
//     { name: 'BOOKS', href: '/books' },
//     { name: 'CONTACT US', href: '/contact' },
//   ];


//   useEffect(() => {
//     const storedDarkMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(storedDarkMode);
//     document.documentElement.classList.toggle('dark', storedDarkMode);
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     localStorage.setItem('darkMode', newDarkMode);
//     document.documentElement.classList.toggle('dark', newDarkMode);
//   };


//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//     {loading ? (
//       <Loadingscr />
//     ) : (
//     <div>
//       <div className="bg-black dark:bg-black mt-1 text-center py-5 font-bold text-2xl text-white">
//         JOBBOX.ORG.IN
//       </div>
//       <nav className="bg-red-900 dark:bg-gray-900 relative mt-0">
//         <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
//           <div className="flex items-center justify-between h-8 md:h-10">
//             <div className="flex items-center">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 type="button"
//                 className="md:hidden flex items-center justify-center p-1 rounded-md text-white focus:outline-none"
//                 aria-controls="mobile-menu"
//                 aria-expanded={isOpen}
//               >
//                 {!isOpen ? (
//                   <>
//                     <svg
//                       className="h-5 w-5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 6h16M4 12h16M4 18h16"
//                       />
//                     </svg>
//                     <span className="ml-2 text-xs">Main Menu</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="h-5 w-5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                     <span className="ml-2 text-xs">Main Menu</span>
//                   </>
//                 )}
//               </button>
//             </div>
//             <div className="flex-1 flex justify-center">
//               <div className="hidden md:flex space-x-6">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="group relative text-white dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
//                   >
//                     <span className="absolute inset-0 rounded-md border border-transparent group-hover:border-white transition-all duration-200"></span>
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={toggleDarkMode}>
//                 {darkMode ? <FaSun className="mr-1 text-xl" style={{ color: 'red' }} /> : <FaMoon className="mr-1 text-xl" style={{ color: 'black' }} />}
//               </button>
//               <Link href="/login">
//                 <button className="bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-400 font-bold px-3 py-1 rounded-full text-xs flex items-center">
//                   <FaUserShield className="mr-1" /> Admin
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//         {isOpen && (
//           <div
//             className="md:hidden absolute top-full left-0 right-0 z-50 bg-black dark:bg-gray-900 shadow-lg"
//             id="mobile-menu"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="text-white dark:text-gray-300 block px-3 py-2 rounded-md text-xs font-medium border-b border-white dark:border-gray-700 w-full mb-2"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               {/* <button
//                 onClick={toggleDarkMode}>
//                 {darkMode ? <FaSun className="mr-1 text-xl" style={{ color: 'red' }} /> : <FaMoon className="mr-1 text-xl" style={{ color: 'black' }} />}
//               </button> */}
//               <Link href="/login">
//                 <button
//                   className="text-left bg-white dark:bg-gray-700 text-red-600 dark:text-yellow-400 font-bold px-3 py-1 rounded-full text-xs flex items-center mt-4"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <FaUserShield className="mr-1" /> Admin
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </div>
//   )}
//   </>
//   );
// };

// export default Navbar;
