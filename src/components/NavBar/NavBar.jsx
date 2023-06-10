import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import "./NavBar.css";
import UserProfile from '../UserProfile/UserProfile';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";  // Importar el hook useAuth en lugar del contexto

const NavBar = () => {
  const { user, logout } = useAuth();  // Usar el hook useAuth para obtener la información de usuario y la función de logout

  return (
    <div className="navbar-home">
      <div className="backToLanding">
        <Link to="/home">
          <div className="icon-button">
            <AiOutlineHome className="icon" />
          </div>
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/about">
          <div className="button-about">About Us</div>
        </Link>

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
      <div className="nav-Cart">
        <Link to="/cart">
          <div>
            <AiOutlineShoppingCart className="icon"/>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;









// import "./NavBar.css";
// import { AiOutlineHome } from 'react-icons/ai';
// import React from "react";
// import { Link, useLocation } from 'react-router-dom';

// import Filters from "../Filters/Filters";
// import SearchBar from "../SearchBar/SearchBar.jsx";
// export default function NavBar({ setCurrentPage, setLoading }) {
//   return (
//     <div>
//       <Link to='/'>Landing</Link>
//       <div>
//         <SearchBar setCurrentPage={setCurrentPage} setLoading={setLoading} />
//       </div>
//       <div>
//         <Link to="/form">
//           <span>Publish Book</span>
//         </Link>
//       </div>
//       <div>
//         <Filters />
//       </div>
//     </div>
//   );
// };

// const NavBar = () => {
//   const location = useLocation();
//   return (
//     <div className="navbar-home">

//       <div className="backToLanding">
//         {location.pathname !== '/home' && (
//           <Link to="/home">
//             <div className="icon-button">
//               <AiOutlineHome className="icon" />
//             </div>
//           </Link>
//         )}
//       </div>

//       <div className="nav-aboutUs">
//         <Link to="/about">
//           <div className="button-about">About Us</div>
//         </Link>
//       </div>

//     </div>
//   )
// }

// export default NavBar;