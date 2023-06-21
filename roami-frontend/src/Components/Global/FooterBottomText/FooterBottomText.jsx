import React from "react";
import "./FooterBottomText.scss";
import { Link } from "react-router-dom";

const FooterBottomText = () => {
  return (
    <section id="footer_bottom_text">
      <div className="container">
        <div className="text_contents">
          <ul>
            <li>
              <span>Ⓒ 2023 </span>
            </li>
            <li>
              <Link to="/">roami.com</Link>
            </li>
            <li>
              <Link to="/">Datenschutz</Link>
            </li>
            <li>
              <Link to="/">Nutzungsbedingungen</Link>
            </li>
            <li>
              <Link to="/">Angaben zum Unternehmen</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FooterBottomText;
