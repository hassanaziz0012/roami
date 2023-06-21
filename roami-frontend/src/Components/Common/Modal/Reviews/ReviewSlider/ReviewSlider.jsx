import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import {
  LeftArrowActive,
  LeftArrowInActive,
  RightArrowActive,
  RightArrowInActive,
} from "../../../../../Icon";
import "./ReviewSlider.scss";
import ReviewItem from "./ReviewItem/ReviewItem";

let iconWidth = "61px";

const ReviewSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // console.log(width);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (width <= 575) {
    iconWidth = "21px";
  }
  if (width > 575 && width <= 991) {
    iconWidth = "41px";
  }

  const settings = {
    dots: true,
    dotsClass: "custom-dots",
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: () => setUpdateCount((prevCount) => prevCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const goToSlide = (index) => {
    setSlideIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  const CustomDot = ({ onClick, active }) => (
    <button
      className={`custom-dot ${active ? "active" : ""}`}
      onClick={onClick}
    />
  );


  const CustomPrevButton = ({ onClick }) => (
    <button
      disabled={slideIndex === 0}
      className="custom_prev_button"
      onClick={onClick}
    >
      {slideIndex === 0 ? (
        <LeftArrowInActive iconWidth={iconWidth} />
      ) : (
        <LeftArrowActive iconWidth={iconWidth} />
      )}
    </button>
  );

  const CustomNextButton = ({ onClick }) => (
    <button
      disabled={slideIndex === 3}
      className="custom_next_button"
      onClick={onClick}
    >
      {slideIndex === 3 ? (
        <RightArrowInActive iconWidth={iconWidth} />
      ) : (
        <RightArrowActive iconWidth={iconWidth} />
      )}
    </button>
  );

  return (
    <div id="review_slider">
      <Slider ref={sliderRef} {...settings}>
        {[1, 2, 3, 4, 5]?.map((item, index) => (
          <ReviewItem key={index} />
        ))}
      </Slider>

      <div className="review_slider_bottom">
        <div className="contents_wrapper">
          <div className="custom-dot-container">
            {[1, 2, 3, 4, 5]?.slice(0, -1).map((item, index) => (
              <CustomDot
                key={index}
                onClick={() => goToSlide(index)}
                active={slideIndex === index}
              />
            ))}
          </div>

          <div className="arrow_btn_group">
            <CustomPrevButton onClick={() => goToSlide(slideIndex - 1)} />
            <CustomNextButton onClick={() => goToSlide(slideIndex + 1)} />
          </div>
        </div>
      </div>

      <div className={`shadow-shape ${slideIndex === 3 ? "d-none" : ""}`}>
        <img src="/images/icon/review-side-shadow.png" alt="" />
      </div>
    </div>
  );
};

export default ReviewSlider;
