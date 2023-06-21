import React, { useState } from "react";
import { Link } from "react-router-dom";

const SliderItem = ({ photo_url, profile_pic_url, username, user_liked, userId }) => {
    const [heartToggle, setHeartToggle] = useState(user_liked);

    return (
        <>
            <img
                className=" carousel_img"
                src={photo_url}
                alt="First slide"
            />

            <div className="slider_top">
                <Link to={`/user-profile/${userId}`} className="pin_creator_img_name">
                    <img src={profile_pic_url} alt="" />
                    <span>{username}</span>
                </Link>
                <button onClick={() => setHeartToggle(!heartToggle)}>
                    <img
                        src={`/images/icon/${heartToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"
                            }`}
                        alt=""
                    />
                </button>
            </div>
        </>
    );
};

export default SliderItem;
