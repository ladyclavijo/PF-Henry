import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return <>
    <p>About</p>
    <Link to="/home">
      <button>Home</button>
    </Link>
    <Link to="/">
      <button>Landing</button>
    </Link>
  </>
}
