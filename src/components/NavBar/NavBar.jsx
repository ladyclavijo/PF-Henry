import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import "./NavBar.css";
import UserProfile from "../UserProfile/UserProfile";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Importar el hook useAuth en lugar del contexto
import { ProtectedButtonAdmin } from "../../pages/Dashboard/ProtectedButtonAdmin";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../ThemeProvider/ThemeProvider";

const NavBar = ({ admin }) => {
  const { user, logout } = useAuth(); // Usar el hook useAuth para obtener la información de usuario y la función de logout
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    toggleTheme();
  };


  return (

    // <ThemeContext.Provider value={theme}>

    <div className={`navbar-home ${theme}`}>
      <div className="backToLanding">
        <Link to="/home">
          <div className="icon-home">
            <AiOutlineHome />
          </div>
        </Link>
      </div>

      <div className="nav-links">


        {/* ------------ SWITCH DARKMODE ------------ */}

        <label className={`ui-switch ${theme === 'dark' ? 'dark' : ''}`}>
          <input type="checkbox" onChange={handleToggleTheme} checked={theme === 'dark'} />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>

        <Link to="/about">
          <div className="button-about">About Us</div>
        </Link>


        <ProtectedButtonAdmin>
          <Link to="/dashboard">
            <div className="mr-5">Dashboard</div>
          </Link>
        </ProtectedButtonAdmin>

        {user == null || user === undefined ? (
          <div className="auth-buttons">
            <Link to="/login">
              <div className="button-signin">Sign In</div>
            </Link>
            <Link to="/register">
              <div className="button-signup">Sign Up</div>
            </Link>
          </div>
        ) : (
          <div className="user-profile">
            <UserProfile user={user} handleLogout={logout} />
          </div>
        )}
      </div>
      {user ? (
        <div className="nav-Cart">
          <Link to="/cart">
            <div className="icon-cart">
              <AiOutlineShoppingCart />
            </div>
          </Link>
        </div>
      ) : (
        <div className="nav-Cart">
          <Link to="/login">
            <div className="icon-cart">
              <AiOutlineShoppingCart />
            </div>
          </Link>
        </div>
      )}
    </div>
    // </ThemeContext.Provider>
  );
};

export default NavBar;