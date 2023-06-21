import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNavbar.scss";

const MobileNavbar = () => {
  const [menu, setMenu] = useState(window.location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);



  useEffect(() => {
    let prevScrollPosition = window.pageYOffset;

    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > prevScrollPosition) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      prevScrollPosition = currentScrollPosition;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section id="mobile_navbar" className={`${isScrolled ? " sticky-top ":"sticky-top "}`}>
      <div className="container">
        <div className="nav_link_group">
          <div
            className={`link-wrapper  ${menu === "/about-us" ? "active " : ""}`}
          >
            <Link
              onClick={() => setMenu("/about-us")}
              className="link_item"
              to="/about-us"
            >
               <img src="/images/icon/story.svg" alt="" />
                Our Story
            </Link>
          </div>
          <div
            className={`link-wrapper  ${
              menu === "/create-pin" ? "active " : ""
            }`}
          >
            <Link
              onClick={() => setMenu("/create-pin")}
              className="link_item"
              to="/create-pin"
            >
              {" "}
              <img src="/images/icon/create-pin.svg" alt="" />
              <span>publish new pins</span>
            </Link>
          </div>
          <div
            className={`link-wrapper  ${menu === "/profile" ? "active " : ""}`}
          >
            <Link
              onClick={() => setMenu("/profile")}
              className="link_item"
              to="/profile"
            >
              <img src="/images/icon/profile.svg" alt="" />
              My Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileNavbar;
