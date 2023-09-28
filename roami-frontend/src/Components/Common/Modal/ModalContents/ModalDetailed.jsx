import React, { useState } from "react";
import "./ModalDetailed.scss";
import ImgSlider from "../ImgSlider/ImgSlider";
import Reviews from "../Reviews/Reviews";
import {
    EmailShareButton, 
    EmailIcon,
    FacebookShareButton, 
    TwitterShareButton, 
    InstapaperShareButton, 
    PinterestShareButton, 
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    InstapaperIcon,
    RedditIcon, 
} from "react-share";
import { Modal } from "react-bootstrap";

const ModalDetailed = ({ data, user }) => {
    const placeId = data.id;
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    

    return (
        <section id="pin_modal">
            <Modal show={show} onHide={handleClose} centered style={{ background: "#fff" }}>
                <Modal.Header>
                    <h1>Share List</h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-center">
                        <EmailShareButton url={window.location.href} subject={title} body="Check out this place!">
                            <EmailIcon round />
                        </EmailShareButton>

                        <FacebookShareButton url={window.location.href}>
                            <FacebookIcon round />
                        </FacebookShareButton>

                        <TwitterShareButton url={window.location.href}>
                            <TwitterIcon round />
                        </TwitterShareButton>

                        <PinterestShareButton url={window.location.href} media={data.photo_1} description="Check out this place!">
                            <PinterestIcon round />
                        </PinterestShareButton>

                        <InstapaperShareButton url={window.location.href} title={title} description="Check out this place!">
                            <InstapaperIcon round />
                        </InstapaperShareButton>

                        <RedditShareButton url={window.location.href} title={title}>
                            <RedditIcon round />
                        </RedditShareButton>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="modal_container mx-auto">
                <div className="modal_contents">
                    {/* img carousel */}
                    <ImgSlider userId={userId} photos={photos} placeId={placeId} />

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
                                    <button className="follow" onClick={() => setShow(true)}>share  <img src="/images/icon/share.svg" alt="" /></button>
                                    <button className="get_list">
                                        <a href={locationLink}>
                                            location{" "}
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
