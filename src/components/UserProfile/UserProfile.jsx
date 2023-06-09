import './UserProfile.css';
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

const UserProfile = ({ user, handleLogout }) => {
  const [isCardOpen, setIsCardOpen] = useState(true);

  const handleCardToggle = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className="user-profile">
      <div className="profile-icon" onClick={handleCardToggle}>
        <FaUserCircle className="icon" />
      </div>
      {isCardOpen && (
        <div className="user-card">
          <div className="card-content">
            <div className="card-profile-picture">
              <FaUserCircle className="user-icon" />
            </div>
            <div className="card-info">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
            </div>
            <Link to='/home'>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;