import React from "react";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";

export default function NavBar({ setCurrentPage, setLoading }) {
  return (
    <div>
      <Link to='/'><span>Landing</span></Link>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} setLoading={setLoading} />
      </div>
      <div>
        <Link to="/form">
          <span>Publish Book</span>
        </Link>
      </div>
      <div>
        <Filters />
      </div>
    </div>
  );
};
