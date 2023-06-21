import React from "react";
import "./Section3.scss";
import { Link } from "react-router-dom";

const Section3 = () => {
  return (
    <section id="section3">
      <div className="contents">
        <div className="content-wrapper">
          <div className="left_side ">
            <div className="img-content">
              <Link to="#">
                <img
                  className="circle-img"
                  src="/images/about/circle-img1.png"
                  alt=""
                />
              </Link>
            </div>
            <div className=" text-content ">
              <h2>Theo</h2>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.{" "}
              </p>
            </div>
          </div>
          <div className="right_side">
            <div className="img-content">
              <Link to="#">
                <img
                  className="circle-img"
                  src="/images/about/vincent.png"
                  alt=""
                />
              </Link>
            </div>
            <div className=" text-content ">
              <h2>Vincent</h2>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
