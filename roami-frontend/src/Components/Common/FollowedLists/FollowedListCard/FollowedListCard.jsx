import React, { useEffect, useState } from "react";
import "./FollowedListCard.scss";
import StarRating from "../../StartRating/StartRating";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ModalDetailed from "../../Modal/ModalContents/ModalDetailed";

const FollowedListCard = ({ btnType, item }) => {
    const [show, setShow] = useState(false);
    const [loveToggle, setLoveToggle] = useState(true);
    const handleClose = () => setShow(false);
    const img = item.photo_1;
    const title = item.place_name;
    const location = item.city + ", " + item.country;
    const rating = 5;
    const [review, setReview] = useState("");
    const [reviewToggle, setReviewToggle] = useState(false);

    //width wise condition
    let target = "_blank";
    const [width, setWidth] = useState(window.innerWidth);
    const updateWidth = () => {
        setWidth(window.innerWidth);
    };
    if (width <= 575) {
        target = "_self";
    }
    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <ModalDetailed />
                    </Modal.Body>
                </Modal>
            }

            <div id="followed_list_card">
                <button className="love_btn" onClick={() => setLoveToggle(!loveToggle)}>
                    <img
                        src={`/images/icon/${loveToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"
                            }`}
                        alt=""
                    />
                </button>

                <Link to="/pin/1" target={target}>
                    <img className="list_image" src={img} alt="" />
                </Link>

                <div className="d-flex justify-content-between align-items-center rating_title">
                    <Link to="/pin/1" target={target}>
                        {" "}
                        <h5>{title}</h5>
                    </Link>
                    <div className="rating">
                        <img src="/images/icon/star-sm.svg" alt="" /> <span>{rating}</span>
                    </div>
                </div>
                <span>
                    {location} <img src="/images/icon/location.svg" alt="" />
                </span>

                {reviewToggle ? (
                    <div>
                        <h5>Rate List:</h5>
                        <StarRating totalStars={5} />
                        <h5>Review:</h5>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>

                        <div className="btn_group">
                            <button
                                className="close_btn"
                                onClick={() => setReviewToggle(false)}
                            >
                                close
                            </button>
                            <button className="publish_btn">publish</button>
                        </div>
                    </div>
                ) : (
                    <h5
                        className="rate_review-text"
                        onClick={() => setReviewToggle(true)}
                    >
                        Rate & review list
                    </h5>
                )}
            </div>
        </>
    );
};

export default FollowedListCard;
