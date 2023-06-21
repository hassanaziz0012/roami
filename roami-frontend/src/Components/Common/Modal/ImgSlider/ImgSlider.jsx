import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./ImgSlider.scss";
import SliderItem from "./SliderItem";

const ImgSlider = ({ userId, photos }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

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
            <Carousel
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
            </Carousel>
        </div>
    );
};

export default ImgSlider;
