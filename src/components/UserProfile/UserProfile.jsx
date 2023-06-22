import './UserProfile.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from "../../context/authContext"
import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/actions/index";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const cardRef = useRef(null);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userDetail);
  const id = user.uid
  const finalUser = currentUser.response


  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);

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
        {finalUser?.photo ? (
            <img src={finalUser?.photo} className="rounded-full p-0.5"/>
        ) : (
            <FaUserCircle className="icon" />
        )}
      </div>
      {isCardOpen && (
        <div className="user-card" ref={cardRef}>
            <div className="card-content">
                <div className="card-profile-picture">
                    {
                        finalUser?.photo ? (
                            <div className="flex items-center">
                                <Link to="/myaccount">
                                    <img src={finalUser?.photo} className="rounded-full p-1 mb-1 w-16"/>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <FaUserCircle className="user-icon" />
                            </div>
                        )
                    }
                </div>
                <Link to="/myaccount">
                    <div className="ml-2 text-black mb-2">
                        <p className="font-bold -mb-1.5">{finalUser.username}</p>
                        <p className="inline text-sm w-full italic">{finalUser.name} {finalUser.lastname}</p>
                    </div>
                </Link>
                <Link to='/mysales'>
                    <button onClick={logout} className="logout-button mr-12">My sales</button>
                </Link>
                <Link to='/home'>
                    <button onClick={logout} className="logout-button">Log out</button>
                </Link>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
