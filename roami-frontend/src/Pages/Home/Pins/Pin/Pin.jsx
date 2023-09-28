import React, { useEffect, useState } from "react";
import "./Pin.scss";
import { Link } from "react-router-dom";
import { backendHost } from "../../../../App";

const Pin = ({ pin, setShow }) => {
    const pinId = pin.id;
    const userId = pin.user.id;
    const creatorimage = pin.user.profile.profile_picture;
    const creator = pin.user.username;
    const title = pin.place_name;
    const location = pin.city + ", " + pin.country;
    const img = pin.photo_1;
    const rating = 5;

    const [isHovered, setIsHovered] = useState(false);
    const [heartToggle, setHeartToggle] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const likePin = () => {
        const authToken = localStorage.getItem("access");
        fetch(`${backendHost}/place/followed/${pinId}/`, {
            method: "POST",
            headers: {
                "Authorization": `jwt ${authToken}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setHeartToggle(data.follow);
        })
    }

    //width wise condition
    let target = "_blank"
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => {
        setWidth(window.innerWidth);
    };
    if (width <= 575) {
        target = "_self"
    }
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <div
            id="pin"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="pin_image_wrapper">
                <Link to={`/pin/${pinId}`} target={target}>
                    {" "}
                    <img className="pin_img" src={img} alt="" />
                </Link>

                <div
                    className={` ${isHovered ? "show-creator_detail" : "close-creator_detail"
                        }`}
                >
                    <Link to={`/user-profile/${userId}`}>
                        <div className="creator_detail">
                            <img src={creatorimage} alt="" width={50} height={50} />
                            <h6 className="creator_name">{creator}</h6>
                        </div>
                    </Link>
                </div>
                <div className="heart_icon">
                    <img
                        onClick={() => likePin()}
                        src={`/images/icon/${heartToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"
                            }`}
                        alt=""
                    />
                </div>

                {rating && (
                    <div className="rating_wrapper">
                        <div className="rating">
                            <img src="/images/pin/star.png" alt="" />
                            <span>{rating}</span>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/pin/1" target={target}>
                <h5>{title}</h5>
            </Link>
            <span>
                <Link to={`?search=${location}`}>
                    {location}
                    <img
                        className="location_icon"
                        src="/images/icon/location.svg"
                        alt=""
                    />
                </Link>
            </span>
        </div>
    );
};

export default Pin;
