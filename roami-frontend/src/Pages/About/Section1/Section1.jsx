import React from "react";
import "./Section1.scss"

const Section1 = () => {
  return (
    <section id="section1">
      <div className="contents">
        <div className="content-wrapper">
          <div className="">
            <div className="left_side text-content">
              <h2>Headline</h2>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.{" "}
              </p>
              <button>Button</button>
            </div>
          </div>
          <div className="">
            <div className="right_side ">
              <img className="box-img" src="/images/about/box-img1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
