import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="content">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Search page
        </Link>
      </div>
    </div>
  );
}

export default Header;
