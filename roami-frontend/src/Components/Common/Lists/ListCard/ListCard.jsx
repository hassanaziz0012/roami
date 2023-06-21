import React, { useEffect, useState } from "react";
import "./ListCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ModalDetailed from "../../Modal/ModalContents/ModalDetailed";

const ListCard = ({ btnType, item }) => {
    const [loveToggle, setLoveToggle] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const title = item.place_name;
    const img = item.photo_1;
    const location = item.city + ', ' + item.country;
    const id = item.id;
    const rating = 0;

    const navigate = useNavigate("");

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
        <>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <ModalDetailed />
                    </Modal.Body>
                </Modal>
            }

            <div id="list_card">
                {btnType === "edit" ? (
                    <button
                        onClick={() => navigate(`/edit-pin/${id}`)}
                        className="edit_btn"
                    >
                        {btnType}
                    </button>
                ) : (
                    <button
                        className="love_btn"
                        onClick={() => setLoveToggle(!loveToggle)}
                    >
                        <img
                            src={`/images/icon/${loveToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"
                                }`}
                            alt=""
                        />
                    </button>
                )}
                <Link to={`/pin/${id}`} target={target}>
                    <img className="list_image" src={img} alt="" />
                </Link>

                <div className="d-flex justify-content-between align-items-center rating_title">
                    <Link to={`/pin/${id}`} target={target}>
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
            </div>
        </>
    );
};

export default ListCard;
