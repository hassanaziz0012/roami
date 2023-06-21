import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
    LeftArrowActive,
    LeftArrowInActive,
    RightArrowActive,
    RightArrowInActive,
} from "../../../../Icon";
import "./TagsSlider.scss";
import Tag from "./Tag";
import { allTags } from "../../../../App";

let iconWidth = "42px";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <div className="shape_image">
                <img className="shape" src="/images/white-shape.png" alt="" />
            </div>
            <div className="icon">
                <RightArrowActive iconWidth={iconWidth} />
                <RightArrowInActive iconWidth={iconWidth} />
            </div>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <div className="shape_image ">
                <img className="shape" src="/images/white-shape -r.png" alt="" />
            </div>

            <div className="icon">
                <LeftArrowActive iconWidth={iconWidth} />
                <LeftArrowInActive iconWidth={iconWidth} />
            </div>
        </div>
    );
}

const TagsSlider = ({ setSelectedTags, selectedTags, handleTagId }) => {
    //width wise condition
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => {
        setWidth(window.innerWidth);
    };
    if (width <= 575) {
        iconWidth = "21px";
    }
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    //useState
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);

    //slider setting
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        rows: "4",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    rows: "5",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: "5",
                },
            },
        ],

        customPaging: () => (
            <div
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "gray",
                    display: "inline-block",
                    margin: "0 4px",
                }}
            ></div>
        ),
        afterChange: () => setUpdateCount((prevCount) => prevCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
    };

    return (
        <section id="pin_tag">
            <div className="container">
                <Slider {...settings}>
                    {allTags?.map((tag, index) => (
                        <Tag
                            selectedTags={selectedTags}
                            handleTagId={handleTagId}
                            key={index}
                            tag={tag}
                        />
                    ))}
                </Slider>

                <div className={`img_shadow ${slideIndex === 0 ? "d-none" : ""}`}>
                    <img src="/images/white-shape -r.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default TagsSlider;
