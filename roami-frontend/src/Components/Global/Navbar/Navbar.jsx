import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import SearchBar from "../../Common/SearchBar/SearchBar";

const Navbar = () => {
  return (
    <nav id="navbar" className="sticky-top bg-white">
      <div className="container">
        <div className="nav_contents">
          <div className="logo">
            <Link to="/">
              <img className="img-fluid" src="/images/logo.png" alt="" />
            </Link>
          </div>

          <div className="nav_right_contents">
            <SearchBar />

            {/* nav-links */}
            <ul>
              <li>
                <Link to="/about-us" className="nav_item">
                  <img src="/images/icon/story.svg" alt="" />
                  Our Story
                </Link>
              </li>
              <li>
                <Link className="nav_item publish_link" to="/create-pin">
                  <img src="/images/icon/create-pin.svg" alt="" />
                  Publish new pins
                </Link>
              </li>
              <li>
                <Link className="nav_item profile" to="/profile">
                  {" "}
                  <img src="/images/icon/profile.svg" alt="" />
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
