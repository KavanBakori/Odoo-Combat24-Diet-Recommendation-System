// import React, { useState } from 'react';
// import './navbar.css';
// import { useAuth0 } from '@auth0/auth0-react';

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav>
//       <h2>Hitahar</h2>
//       <ul>
//         <li>
//           {isAuthenticated ? (
//             <div className="dropdown">
//               <button className="dropdown-btn" onClick={toggleDropdown}>
//                 <img src="/images/user_profile_icon.png" alt="user_profile" width="30px" height="" />
//               </button>
//               {isDropdownOpen && (
//                 <div className="dropdown-content">
//                   <p style={{ textAlign: 'center' }}>Welcome, {user?.name}</p>
//                   <a href='profile' style={{ cursor: 'pointer' }}>My Profile</a>
//                   <a
//                     href="/"
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
//                   >
//                     Sign Out
//                   </a>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               style={{
//                 backgroundColor: '#1AB79D',
//                 paddingInline: '40px',
//                 paddingTop: '10px',
//                 paddingBottom: '10px',
//                 borderRadius: '10px',
//                 color: 'white',
//               }}
//               onClick={() => loginWithRedirect()}
//             >
//               Try for free
//             </button>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;






import  { useState } from 'react';
import './navbar.css';
import { useAuth0 } from '@auth0/auth0-react';


const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-semibold text-indigo-600">Hitahara</span>
            </div>
            <div className="hidden md:block">
              {/* <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-800 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Dashboard</a>
                <a href="#" className="text-gray-800 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Profile</a>
                <a href="#" className="text-gray-800 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Analytics</a>
                <a href="#" className="text-gray-800 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Support</a>
              </div> */}
            </div>
          </div>
          <div className="hidden md:block">
            {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
              Log Out
            </button> */}
            {isAuthenticated ? (
            <div className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                <img src="/images/user_profile_icon.png" alt="user_profile" width="30px" height="" />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <p style={{ textAlign: 'center' }}>Welcome, {user?.name}</p>
                  <a href='popupform' style={{ cursor: 'pointer' }}>My Profile</a>
                  <a
                    href="/"
                    style={{ cursor: 'pointer' }}
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <button
               className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              onClick={() => loginWithRedirect()}
            >
              Try for free
            </button>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
