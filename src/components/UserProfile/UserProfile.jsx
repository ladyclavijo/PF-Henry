import './UserProfile.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from "../../context/authContext"
import React, { useState, useEffect, useRef } from 'react';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        !event.target.classList.contains("icon")
      ) {
        setIsCardOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsCardOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-icon" onClick={() => setIsCardOpen(!isCardOpen)}>
        <FaUserCircle className="icon" />
      </div>
      {isCardOpen && (
        <div className="user-card" ref={cardRef}>
          <div className="card-content">
            <div className="card-profile-picture">
              <FaUserCircle className="user-icon" />
            </div>
            <div className="card-info">
              <h3 className="user-name">
                <Link to="/myaccount">My Account</Link>
              </h3>
              <p className="user-email">{user?.email}</p>
            </div>
            <Link to='/home'>
              <button onClick={logout} className="logout-button">Logout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
