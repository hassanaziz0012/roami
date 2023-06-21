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
            <div className="shape_image">
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

    const allTags = [
        {
            id: 1,
            img: "/images/tags/sunset.svg",
            title: "Sunset Spots",
        },
        {
            id: 2,
            img: "/images/tags/swimming.svg",
            title: "Swimming",
        },
        {
            id: 3,
            img: "/images/tags/museum.svg",
            title: "Museum",
        },
        {
            id: 4,
            img: "/images/tags/shopping-bag.svg",
            title: "Shopping",
        },
        {
            id: 5,
            img: "/images/tags/car.svg",
            title: "Free Parking",
        },
        {
            id: 6,
            img: "/images/tags/sunset.svg",
            title: "Sunset Spots",
        },
        {
            id: 7,
            img: "/images/tags/swimming.svg",
            title: "Swimming",
        },
        {
            id: 8,
            img: "/images/tags/plattforms.svg",
            title: "Viewing Plattforms",
        },
        {
            id: 9,
            img: "/images/tags/drinks.svg",
            title: "Drinks",
        },
        {
            id: 10,
            img: "/images/tags/food.svg",
            title: "Food",
        },
        {
            id: 11,
            img: "/images/tags/accomondation.svg",
            title: "Accomondation",
        },
        {
            id: 12,
            img: "/images/tags/theater.svg",
            title: "Theater",
        },
        {
            id: 13,
            img: "/images/tags/popcorn.svg",
            title: "Cinema",
        },
        {
            id: 14,
            img: "/images/tags/park.svg",
            title: "Parks",
        },
        {
            id: 15,
            img: "/images/tags/plattforms.svg",
            title: "Viewing Plattforms",
        },
        {
            id: 16,
            img: "/images/tags/sunset.svg",
            title: "Sunset Spots",
        },
        {
            id: 17,
            img: "/images/tags/swimming.svg",
            title: "Swimming",
        },
        {
            id: 18,
            img: "/images/tags/museum.svg",
            title: "Museum",
        },
        {
            id: 19,
            img: "/images/tags/party.svg",
            title: "Jibbo friendly",
        },
        {
            id: 20,
            img: "/images/tags/car.svg",
            title: "Free Parking",
        },
        {
            id: 21,
            img: "/images/tags/sunset.svg",
            title: "Sunset Spots",
        },
        { id: 22, img: "/images/tags/swimming.svg", title: "Swimming" },
        { id: 23, img: "/images/tags/plattforms.svg", title: "Viewing Plattforms" },
        { id: 24, img: "/images/tags/drinks.svg", title: "Drinks" },
        { id: 25, img: "/images/tags/food.svg", title: "Food" },
        {
            id: 26,
            img: "/images/tags/accomondation.svg",
            title: "Accomondation",
        },
        { id: 27, img: "/images/tags/theater.svg", title: "Theater" },
        { id: 28, img: "/images/tags/popcorn.svg", title: "Cinema" },
        { id: 29, img: "/images/tags/park.svg", title: "Parks" },
        { id: 30, img: "/images/tags/plattforms.svg", title: "Viewing Plattforms" },
    ];

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
