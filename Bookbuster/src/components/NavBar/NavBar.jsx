import React from "react";
import { Filters } from '../Filters/Filters.jsx';
import { SearchBar } from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

export default  NavBar = ({setCurrentPage}) => {
  return (
  <div>
    <div>
     <SearchBar setCurrentPage={setCurrentPage} />
    </div>
    <div>
      <Link to='/form'><span>Publish Book</span></Link>
    </div>
    <div><Filters /></div>
  </div>
  ) 
};
