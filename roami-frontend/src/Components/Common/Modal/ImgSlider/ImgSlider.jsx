import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./ImgSlider.scss";
import SliderItem from "./SliderItem";
import { backendHost } from "../../../../App";
import { Link } from "react-router-dom";

const ImgSlider = ({ userId, photos, placeId }) => {
    const user_liked = true;
    const [heartToggle, setHeartToggle] = useState(user_liked);
    const [index, setIndex] = useState(0);

    const numOfValidPhotos = photos.map(photo => photo.photo_url).filter(photo => photo && photo.photo_url !== null).length;

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const likePin = () => {
        const authToken = localStorage.getItem("access");
        fetch(`${backendHost}/place/followed/${placeId}/`, {
            method: "POST",
            headers: {
                "Authorization": `jwt ${authToken}`
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            setHeartToggle(data.follow);
        })
    }

    const CustomNextButton = ({ onClick }) => (
        <button className="custom-next-btn" onClick={onClick}>
            <img src="/images/icon/arrow-right.png" alt="" />
        </button>
    );

    const CustomPrevButton = ({ onClick }) => (
        <button className="custom-prev-btn" onClick={onClick}>
            <img src="/images/icon/arrow-left.png" alt="" />
        </button>
    );

    return (
        <div id="img_slider">
            <div className="username-container">
                <Link to={`/user-profile/${userId}`}>
                    <span className="username">@hassan</span>
                </Link>
                
            </div>
            
            {
                numOfValidPhotos === 1 ?
                <div className="row" style={{position: "relative"}}>
                    <div className="col-lg-6 p-0 offset-lg-3">
                        <img src={photos[0].photo_url} alt="1" className="img-fluid background" style={{backgroundImage: `url(${photos[0].photo_url})`}} />
                        
                        <picture className="picture">
                            <img src={photos[0].photo_url} alt="1" className="img-fluid" />
                        </picture>
                        <button className="like-icon" onClick={() => likePin()}>
                            <img
                                src={`/images/icon/${heartToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"}`}
                                alt=""
                            />
                        </button>
                    </div>
                </div>
                :
                numOfValidPhotos === 5 ? 
                <div className="row">
                    <div className="col-lg-6 p-0">
                        <picture className="picture">
                            <img src={photos[0].photo_url} alt="1" className="img-fluid" />
                        </picture>
                    </div>
                    <div className="row col-lg-6 p-0">
                        <div style={{position: "relative"}}>
                            <button className="like-icon" onClick={() => likePin()} style={{left: "92%"}}>
                                <img
                                    src={`/images/icon/${heartToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"}`}
                                    alt=""
                                />
                            </button>
                        </div>
                        <div className="col-lg-6 p-0">
                            <picture className="picture">
                                <img src={photos[1].photo_url} alt="" />
                            </picture>
                        </div>
                        <div className="col-lg-6 p-0">
                            <picture className="picture">
                                <img src={photos[2].photo_url} alt="" />
                            </picture>
                        </div>
                        <div className="col-lg-6 p-0">
                            <picture className="picture">
                                <img src={photos[3].photo_url} alt="" />
                            </picture>
                        </div>
                        <div className="col-lg-6 p-0">
                            <picture className="picture">
                                <img src={photos[4].photo_url} alt="" />
                            </picture>
                        </div>
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col-lg-6 p-0">
                        <picture className="picture">
                            <img src={photos[0].photo_url} alt="1" className="img-fluid" />
                        </picture>
                    </div>
                    <div className="col-lg-6 p-0">
                        <div style={{position: "relative"}}>
                            <button className="like-icon" onClick={() => likePin()} style={{left: "90%"}}>
                                <img
                                    src={`/images/icon/${heartToggle ? "white-heart-fill.svg" : "white-heart-outline.svg"}`}
                                    alt=""
                                />
                            </button>
                        </div>
                        <picture className="picture">
                            <img src={photos[1].photo_url} alt="2" className="img-fluid blur" />
                            <span className="overlay">+{numOfValidPhotos - 1}</span>
                        </picture>
                    </div>
                </div>
            }
            {/* <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                nextIcon={<CustomNextButton />}
                prevIcon={<CustomPrevButton />}
            >
                {photos.map((item, index) => {
                    if (item.photo_url !== null) {
                        console.log(item);
                        return (
                            <Carousel.Item key={index}>
                                <SliderItem 
                                    userId={userId} 
                                    photo_url={item.photo_url} 
                                    profile_pic_url={item.profile_pic_url} 
                                    username={item.username} 
                                    user_liked={item.user_liked} 
                                />
                            </Carousel.Item>
                        )
                    }
                })}
            </Carousel> */}
        </div>
    );
};

export default ImgSlider;
