import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <Link to="/create">
        <h3>Create User</h3>
      </Link>
    </div>
  );
}

export default Header;
