import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header_logo" className="sticky-top bg-white">
      <div className="container">
        <Link to="/">
          <img src="/images/logo.svg" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
