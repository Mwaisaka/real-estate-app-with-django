// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import SoftDev from "../Images/SoftDev.jpg";

// export default function Header() {
//   const [isSupportDropdownOpen, setSupportDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleSupportDropdown = () =>
//     setSupportDropdownOpen(!isSupportDropdownOpen);
//   const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

//   // Function to close the mobile menu when a link is clicked
//   const closeMobileMenu = () => setMobileMenuOpen(false);

//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <header className="shadow-none sticky z-50 top-0">
//       <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 w-full">
//         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//           <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
//             <img
//               src={SoftDev}
//               className="mr-6 h-24"
//               alt="Logo"
//               style={{ width: "100px", height: "100px" }}
//             />
//           </Link>
          
//           <div className="flex items-center lg:order-3 lg:px-24 lg:space-x-10">
            
//             <Link
//               to="/about"
//               className="text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//               onClick={closeMobileMenu} // Close menu on button click
//             >
//               Contact Me
//             </Link>
//             <button
//               onClick={toggleMobileMenu}
//               type="button"
//               className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//               aria-controls="mobile-menu-2"
//               aria-expanded={isMobileMenuOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-6 h-6"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M3 5h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zM3 10h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 011-1z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//           <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="m-4 px-4 py-0 bg-gray-200 dark:bg-gray-700 rounded"
//       >
//         Toggle {darkMode ? "Light" : "Dark"} Mode
//       </button>
//     </div>
//           <div
//             className={`${
//               isMobileMenuOpen ? "block" : "hidden"
//             } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
//             id="mobile-menu-2"
//           >
//             <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-black-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <div
//                   className="relative dropdown px-3"
//                   onMouseEnter={() => setSupportDropdownOpen(true)}
//                   onMouseLeave={() => setSupportDropdownOpen(false)}
//                 >
//                   <span className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 cursor-pointer flex items-center justify-between">
//                     Portfolio
//                     <svg
//                       className="w-4 h-4 ml-1 transition-transform duration-200"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       ></path>
//                     </svg>
//                   </span>
//                   {isSupportDropdownOpen && (
//                     <ul className="absolute bg-white pt-2 border border-gray-200 dropdown z-10">
//                       <li>
//                         <NavLink
//                           to="/portfolio"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={closeMobileMenu} // Close menu on link click
//                         >
//                           Portfolio
//                         </NavLink>
//                         <NavLink
//                           to="/gallery"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                           onClick={closeMobileMenu} // Close menu on link click
//                         >
//                           Gallery
//                         </NavLink>
//                       </li>
//                     </ul>
//                   )}
//                 </div>
//               </li>
//               {/* <li>
//                 <NavLink
//                   to="/planner"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Planner
//                 </NavLink>
//               </li> */}
//               <li>
//                 <NavLink
//                   to="/testimonials"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Testimonials
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/weather"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Weather
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/admin-login"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
//                     ${isActive ? "text-orange-500" : "text-gray-700"} 
//                     lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                   }
//                   onClick={closeMobileMenu} // Close menu on link click
//                 >
//                   Site Admin
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SoftDev from "../Images/SoftDev.jpg";

export default function Header() {
  const [isSupportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSupportDropdown = () =>
    setSupportDropdownOpen(!isSupportDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="shadow-none sticky z-50 top-0">
      <nav className="bg-white dark:bg-gray-900 border-gray-200 px-4 lg:px-6 py-2.5 w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img
              src={SoftDev}
              className="mr-6 h-24"
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>

          <div className="flex items-center lg:order-3 lg:px-24 lg:space-x-4">
            <Link
              to="/about"
              className="text-white bg-orange-500 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              onClick={closeMobileMenu}
            >
              Contact Me
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded focus:outline-none transition duration-300"
            >
              {darkMode ? "Light" : "Dark"} Mode
            </button>

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zM3 10h14a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-black-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <div
                  className="relative dropdown px-3"
                  onMouseEnter={() => setSupportDropdownOpen(true)}
                  onMouseLeave={() => setSupportDropdownOpen(false)}
                >
                  <span className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 cursor-pointer flex items-center justify-between">
                    Portfolio
                    <svg
                      className="w-4 h-4 ml-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                  {isSupportDropdownOpen && (
                    <ul className="absolute bg-white pt-2 border border-gray-200 dropdown z-10">
                      <li>
                        <NavLink
                          to="/portfolio"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMobileMenu}
                        >
                          Portfolio
                        </NavLink>
                        <NavLink
                          to="/gallery"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMobileMenu}
                        >
                          Gallery
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  Testimonials
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/weather"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  Weather
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-login"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  onClick={closeMobileMenu}
                >
                  Site Admin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
