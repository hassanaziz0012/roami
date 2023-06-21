import React, { useState } from "react";
import "./ModalDetailed.scss";
import ImgSlider from "../ImgSlider/ImgSlider";
import Reviews from "../Reviews/Reviews";

const ModalDetailed = ({ data, user }) => {
    const title = data.place_name;
    const description = data.description;
    const locationLink = data.location_link;
    const rating = "5,0";
    const city = data.city;
    const country = data.country;
    const userId = user ? user.id : null;

    const photos = [
        {
            photo_url: data.photo_1,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
        {
            photo_url: data.photo_2,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
        {
            photo_url: data.photo_3,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
        {
            photo_url: data.photo_4,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
        {
            photo_url: data.photo_5,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
        {
            photo_url: data.photo_6,
            profile_pic_url: user ? user.profile_picture : "",
            username: user ? user.username : "",
            user_liked: true
        },
    ]

    const locationName = `${city}, ${country}`;

    return (
        <section id="pin_modal">
            <div className="modal_container mx-auto">
                <div className="modal_contents">
                    {/* img carousel */}
                    <ImgSlider userId={userId} photos={photos} />

                    {/* text contents */}

                    <div className="text_contents_wrapper">
                        <div className="text-content">
                            <div className="left">
                                <h2>{title}</h2>
                                <div className="location">
                                    <span>{locationName}</span>
                                    <img src="/images/icon/location.svg" alt="" />
                                </div>
                                {/* md-show not show in mobile device */}
                                <p className="md-show">
                                    {description}
                                </p>

                                <div className="star">
                                    <img src="/images/icon/star.png" alt="" />
                                    <span>{rating}</span>
                                </div>
                            </div>

                            <div className="right">
                                <div className="btn_group">
                                    <button className="follow">share  <img src="/images/icon/share.svg" alt="" /></button>
                                    <button className="get_list">
                                        <a href={locationLink}>
                                            get list{" "}
                                        </a>
                                        <img src="/images/icon/location-color-sm.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* sm-show  show for mobile device */}
                        <p className="sm-show">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                            erat, sed diam voluptua. At vero eos et accusam et justo duo
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                            sanctus est Lorem ipsum dolor sit amet. L
                        </p>
                    </div>

                    {/* Reviews */}
                    <Reviews />
                </div>
            </div>
        </section>
    );
};

export default ModalDetailed;
