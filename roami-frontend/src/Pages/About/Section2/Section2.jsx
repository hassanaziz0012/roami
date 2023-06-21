import React from "react";
import "./Section2.scss";

const Section2 = () => {
  return (
    <section id="section2">
      <div className="contents">
        <div className="content-wrapper">
          <div className="left_side ">
            <div className="img-content" >
              <img
                className="box-img"
                src="/images/about/box-img2.png"
                alt=""
              />
            </div>
          </div>
          <div className="right_side">
            <div className=" text-content ">
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
        </div>
      </div>
    </section>
  );
};

export default Section2;
