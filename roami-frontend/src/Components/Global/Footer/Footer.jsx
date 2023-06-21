import React from "react";
import "./Footer.scss";
import FooterBottomText from "../FooterBottomText/FooterBottomText"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer_contents">
          <div className="footer_left_side">
            <img className="logo" src="/images/logo.png" alt="" />
            <ul>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
              <li>
                <Link to="/create-pin">Create new pins</Link>
              </li>
              <li>
                <Link to="/">Explore Page</Link>
              </li>
              <li>
                <Link to="/about-us">About roami</Link>
              </li>
            </ul>
          </div>
          <div className="footer_right_side">
            <h2>
              Explore our most popular <span>lists.</span>
            </h2>
            <div className="footer_link_grid">
              <ul>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
                <li>
                  <Link to="/">Popular List</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterBottomText/>
    </footer>
  );
};

export default Footer;
