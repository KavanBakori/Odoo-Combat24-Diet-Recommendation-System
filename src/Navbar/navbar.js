import React, { useState } from 'react';
import './navbar.css';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <h2>Hitahar</h2>
      <ul>
        <li>
          {isAuthenticated ? (
            <div className="dropdown">
              <button className="dropdown-btn" onClick={toggleDropdown}>
                <img src="/images/user_profile_icon.png" alt="user_profile" width="30px" height="" />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <p style={{ textAlign: 'center' }}>Welcome, {user?.name}</p>
                  <a href='profile' style={{ cursor: 'pointer' }}>My Profile</a>
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
              style={{
                backgroundColor: '#1AB79D',
                paddingInline: '40px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderRadius: '10px',
                color: 'white',
              }}
              onClick={() => loginWithRedirect()}
            >
              Try for free
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
