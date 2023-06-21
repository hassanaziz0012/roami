import React from "react";
import { RightArrow } from "../../../Icon";
import Slider from "react-slick";
import ListCard from "./ListCard/ListCard";
import "./Lists.scss";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <button className="right_arrow_btn">
                <RightArrow />
            </button>
            {/* <RightArrowInActive /> */}
        </div>
    );
}

const Lists = ({ btnType, listsData }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "120px",
                    slidesToShow: 0.8,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "90px",
                    slidesToShow: 0.8,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "70px",
                    slidesToShow: 0.8,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 330,
                settings: {
                    className: "center",
                    centerMode: true,
                    infinite: true,
                    centerPadding: "60px",
                    slidesToShow: 0.8,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
        ],
    };
    return (
        <section id="lists">
            <div className="container">
                <h1>Lists</h1>
                <div className="slider_contents">
                    <Slider {...settings}>
                        {listsData?.map((item, index) => (
                            <ListCard key={index} item={item} btnType={btnType} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Lists;
