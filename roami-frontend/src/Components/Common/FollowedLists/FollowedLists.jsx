import React, { useEffect, useRef, useState } from "react";
import "./FollowedLists.scss";
import FollowedListCard from "./FollowedListCard/FollowedListCard";
import { RightArrow } from "../../../Icon";
import Slider from "react-slick";
import ListCard from "../Lists/ListCard/ListCard";
import { useNavigate } from "react-router-dom";
import { backendHost } from "../../../App";

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

const FollowedLists = () => {
    const [data, setData] = useState([]);
    const [followedListsData, setFollowedListsData] = useState([]);
    const navigate = useNavigate();

    const getFollowedLists = () => {
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
            navigate('/sign-in');
        }

        fetch(`${backendHost}/user/followed/list/`, {
            method: "GET",
            headers: {
                "Authorization": `jwt ${accessToken}`
            },
        }).then((res) => {
            res.json().then((data) => {
                setFollowedListsData(data.results);
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch("/pins.json");
                const accessToken = localStorage.getItem("access");
                const response = await fetch(`${backendHost}/user/followed/list/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `jwt ${accessToken}`
                    }
                });
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData.results);

            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
        // getFollowedLists();
    }, []);

    useEffect(() => {
        setFollowedListsData([...new Set(data)]);
    }, [data])

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
        <section id="followed_lists">
            <div className="container">
                <h1>Followed Lists</h1>
                <div className="slider_contents">
                    <Slider {...settings}>
                        {followedListsData?.map((item, index) => (
                            <FollowedListCard key={index} item={item} btnType={"unfollow"} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default FollowedLists;
