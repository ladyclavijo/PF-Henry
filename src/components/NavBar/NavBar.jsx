import "./NavBar.css";
import { AiOutlineHome } from 'react-icons/ai';
import React from "react";
// import Filters from "../Filters/Filters";
// import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";

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

const NavBar = () => {
  return(
    <div className="navbar-home">

      <div className="backToLanding">
        <Link to="/home">
          <div className="icon-button">
            <AiOutlineHome className="icon"/>
          </div>
        </Link>   
      </div>

      <div className="nav-aboutUs">
        <Link to="/about">
          <div className="button-about">About Us</div>
        </Link>
      </div>

    </div>
  )
}

export default NavBar;