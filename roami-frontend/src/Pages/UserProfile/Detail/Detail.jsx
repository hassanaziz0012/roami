import React, { useState } from "react";
import "./Detail.scss";
import { Link } from "react-router-dom";
import { backendHost } from "../../../App";

const Detail = ({ userId }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    //data
    const [description, setDescription] = useState(
        `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`
    );
    const [name, setName] = useState("Jamal Hill");
    const [city, setCity] = useState("Puerto Rico");
    const [home, setHome] = useState("California");
    const [loveTag, setLoveTag] = useState(
        "Photography, Design, Music, Roadtrips, Biking"
    );

    //handle social media useState
    const [paypalUrl, setPaypalUrl] = useState("jhone11");
    const [instagramUrl, setInstagramUrl] = useState("jhone111");

    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [pinterestUrl, setPinterestUrl] = useState("");

    const [twitterUrl, setTwitterUrl] = useState("jhone111");

    const [facebookUrl, setFacebookUrl] = useState("");

    const [file, setFile] = useState("/images/profile/mainprofile.png");
    const [fileObj, setFileObj] = useState(null);

    const getFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObj(e.target.files[0]);
    };

    const getProfile = () => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            fetch(`${backendHost}/account/profile/${userId}/`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${accessToken}`
                }
            }).then((res) => {
                res.json().then((data) => {
                    console.log(data);

                    setFile(data.profile.profile_picture);
                    setName(data.username);
                    setDescription(data.profile.bio || "");
                    setCity(data.profile.city);
                    setHome(data.profile.country);

                    setPaypalUrl(data.profile.paypal);
                    setFacebookUrl(data.profile.facebook);
                    setPinterestUrl(data.profile.pinterest);
                    setInstagramUrl(data.profile.instagram);
                    setYoutubeUrl(data.profile.youtube);
                    setTwitterUrl(data.profile.twitter);
                    
                })
            })
        }
    }

    useState(() => {
        getProfile();
    }, [])

    return (
        <section id="user_profile">
            <div className="container">
                <div className="profile_contents">
                    {/* profile pic side */}
                    <div className="item">
                        <div className="left">
                            <img
                                className="circle_img"
                                src={file}
                                alt=""
                            />
                            <h1>{name}</h1>
                            {/* <div className="bottom">
                                <h2>94</h2>
                                <img src="/images/icon/blue-heart-outline.svg" alt="" />
                            </div>
                            <span>Community Score</span> */}

                            <button className="follow_btn">follow +</button>
                        </div>
                    </div>

                    {/* bio donation social */}

                    <div className="item">
                        <p className="joined_text">Joined in 2023</p>
                        <div className="right">
                            <h1>Bio</h1>
                            <p>
                                {description}
                            </p>

                            {/* contact info */}

                            <div className="contact_group">
                                <div className="contact_item">
                                    <div className="img_wrapper">
                                        <img src="/images/icon/p-location.svg" alt="" />
                                    </div>

                                    <p>{city}</p>
                                </div>
                                <div className="contact_item">
                                    <div className="img_wrapper">
                                        <img src="/images/icon/p-house.svg" alt="" />
                                    </div>

                                    <p>{home}</p>
                                </div>
                                <div className="contact_item">
                                    <div className="img_wrapper">
                                        <img src="/images/icon/p-heart.svg" alt="" />
                                    </div>

                                    <p>Photography, Design, Music, Roadtrips, Biking</p>
                                </div>
                            </div>

                            {/* Donations */}
                            <div className="donation">
                                <h6>Say Thank You</h6>
                                <button className="paypal_btn">
                                    <Link to={paypalUrl}>
                                        {" "}
                                        <img src="/images/social-icon/paypal.png" alt="" /> Pay
                                        <span>Pal.me</span>
                                    </Link>
                                </button>
                            </div>

                            {/* Social Media*/}
                            <h6>Socials</h6>
                            <div className="social_media_group">
                                <Link to={instagramUrl}>
                                    <img
                                        src="/images/social-icon/instagram.png"
                                        alt="instagram"
                                    />
                                </Link>
                                <Link to={youtubeUrl}>
                                    <img src="/images/social-icon/youtube.png" alt="youtube" />
                                </Link>

                                <Link to={pinterestUrl}>
                                    <img
                                        src="/images/social-icon/pinterest.png"
                                        alt="pinterest"
                                    />
                                </Link>
                                <Link to={twitterUrl}>
                                    <img src="/images/social-icon/twitter.png" alt="twitter" />
                                </Link>
                                <Link to={facebookUrl}>
                                    <img src="/images/social-icon/facebook.png" alt="facebook" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detail;
