import React, { useEffect, useRef, useState } from "react";
import "./Detail.scss";
import Tag from "./LoveTagItem";
import { backendHost } from "../../../App";

const Detail = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [isBioEdit, setIsBioEdit] = useState(false);

    //menu toggle
    const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
    const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);

    //data
    const [userId, setUserId] = useState();
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
    const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
    const [isFacebookModalOpen, setIsFacebookModalOpen] = useState(false);
    const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
    const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
    const [isPinterestModalOpen, setIsPinterestModalOpen] = useState(false);
    const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);

    const [paypalUrl, setPaypalUrl] = useState("jhone11");
    const [instagramUrl, setInstagramUrl] = useState("jhone111");

    const [youtubeUrl, setYoutubeUrl] = useState("");

    const [pinterestUrl, setPinterestUrl] = useState("");

    const [twitterUrl, setTwitterUrl] = useState("jhone111");

    const [facebookUrl, setFacebookUrl] = useState("");

    //handle tag
    const handleTag = (tag) => {
        const findTag = selectedTags?.find((i) => i === tag);
        if (findTag) {
            setSelectedTags((prevSelectedTags) =>
                prevSelectedTags.filter((i) => i !== tag)
            );
        } else {
            setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
        }
    };

    const getProfile = () => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            fetch(`${backendHost}/account/profile/`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${accessToken}`
                }
            }).then((res) => {
                res.json().then((data) => {
                    console.log(data);

                    setUserId(data.id);
                    // setName(data.first_name + ' ' + data.last_name);
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

    const updateProfile = () => {
        console.log(isBioEdit);
        if (isBioEdit === true) {
            fetch(`${backendHost}/account/profile/update/${userId}/`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${localStorage.getItem("access")}`
                },
                body: JSON.stringify({
                    bio: description,
                    country: home,
                    city: city,
                    paypal: paypalUrl,
                    facebook: facebookUrl,
                    twitter: twitterUrl,
                    pinterest: pinterestUrl,
                    instagram: instagramUrl,
                    youtube: youtubeUrl,
                })
            }).then((res) => {
                res.json().then((data) => {
                    console.log(data);
                })
            })
        }

        setIsBioEdit(!isBioEdit); // Go back to displaying the profile data.
    }

    const updateUser = () => {
        console.log(isNameEdit);
        if (isNameEdit === true) {
            const formData = new FormData();
            formData.append("username", name);
            formData.append("profile_picture", fileObj);

            fetch(`${backendHost}/account/user/update/${userId}/`, {
                method: "PATCH",
                headers: {
                    'Authorization': `jwt ${localStorage.getItem("access")}`
                },
                body: formData
            }).then((res) => {
                res.json().then((data) => {
                    console.log(data);
                })
            })
        }
        setIsNameEdit(!isNameEdit);
    }

    useEffect(() => {
        getProfile();

        const updatedTags = selectedTags.join(" , ");
        if (selectedTags.length > 0) {
            setLoveTag(updatedTags);
        }
    }, [selectedTags]);

    //handle social media
    const socialMedia = {
        instagram: instagramUrl,
        youtube: youtubeUrl,
        pinterest: pinterestUrl,
        twitter: twitterUrl,
        facebook: facebookUrl,
        paypal: paypalUrl,
    };

    //profile pic
    const [file, setFile] = useState("/images/profile/mainprofile.png");
    const [fileObj, setFileObj] = useState(null);

    const getFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObj(e.target.files[0]);
    };

    //instagram
    const containerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsInstagramModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // youtube
    const containerRef2 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef2.current &&
                !containerRef2.current.contains(event.target)
            ) {
                setIsYoutubeModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // pinterest
    const containerRef3 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef3.current &&
                !containerRef3.current.contains(event.target)
            ) {
                setIsPinterestModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    // twitter
    const containerRef4 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef4.current &&
                !containerRef4.current.contains(event.target)
            ) {
                setIsTwitterModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // facebook
    const containerRef5 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef5.current &&
                !containerRef5.current.contains(event.target)
            ) {
                setIsFacebookModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // paypal
    const containerRef6 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef6.current &&
                !containerRef6.current.contains(event.target)
            ) {
                setIsPaypalModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // city
    const containerRef7 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef7.current &&
                !containerRef7.current.contains(event.target)
            ) {
                setIsCityMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // home
    const containerRef8 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef8.current &&
                !containerRef8.current.contains(event.target)
            ) {
                setIsHomeMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // love tag
    const containerRef9 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef9.current &&
                !containerRef9.current.contains(event.target)
            ) {
                setIsTagMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const allCity = [
        { id: 1, title: "Puerto Rico" },
        { id: 2, title: "Italy" },
        { id: 2, title: "Italy" },
        { id: 2, title: "Italy" },
        { id: 2, title: "Italy" },
        { id: 2, title: "Italy" },
        { id: 3, title: "Moadit" },
        { id: 4, title: "Berlin" },
        { id: 5, title: "Seattle" },
        { id: 1, title: "Puerto Rico22" },
        { id: 2, title: "Italy222" },
        { id: 3, title: "Moadit22" },
        { id: 4, title: "Berlin22" },
        { id: 5, title: "Seattle22" },
        { id: 1, title: "Puerto Rico33" },
        { id: 2, title: "Italy33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 3, title: "Moadit33" },
        { id: 4, title: "Berlin33" },
        { id: 5, title: "Seattle33" },
    ];
    const allCountry = [
        { id: 1, title: "California" },
        { id: 2, title: "Italy" },
        { id: 3, title: "Moadit" },
        { id: 4, title: "Berlin" },
        { id: 5, title: "Seattle" },
    ];

    const filteredCity = allCity?.filter((i) =>
        i.title?.toLowerCase().includes(city?.toLowerCase())
    );
    const filteredCountry = allCountry?.filter((i) =>
        i.title?.toLowerCase().includes(home?.toLowerCase())
    );



    return (
        <section id="profile">
            <div className="container">
                <div className="profile_contents">
                    {/* profile pic side */}
                    <div className="item">
                        <div className="left">
                            <div className="img_wrapper">
                                <img
                                    className={`circle_img ${isNameEdit ? "opacity_low" : ""}`}
                                    src={file}
                                    alt=""
                                />

                                <div
                                    className={`img_edit ${isNameEdit ? "" : "d-none"}`}
                                    onClick={() =>
                                        document.querySelector(".profile_pic_input").click()
                                    }
                                >
                                    <input
                                        type="file"
                                        onChange={getFile}
                                        className="profile_pic_input"
                                        name=""
                                        id=""
                                        accept="image/*"
                                        hidden
                                    />
                                    <img src="/images/icon/camera.png" alt="" />
                                </div>
                            </div>

                            <input
                                className={`${isNameEdit ? "edit_mode_style" : ""}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name=""
                                id=""
                                readOnly={!isNameEdit}
                            />
                            <div className="bottom">
                                <h2>94</h2>
                                <img src="/images/icon/blue-heart-outline.svg" alt="" />
                            </div>
                            <span>Community Score</span>

                            <button className="follow_btn">follow +</button>
                        </div>

                        <button
                            className="edit_btn"
                            onClick={() => updateUser()}
                        >
                            <img
                                src={`/images/icon/${isNameEdit ? "checkmark.png" : "edit-pen.png"
                                    }`}
                                alt=""
                            />
                        </button>
                    </div>

                    {/* bio donation social */}

                    <div className="item">
                        <p className="joined_text">Joined in 2023</p>
                        <div className="right">
                            <h1>Bio</h1>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name=""
                                id=""
                                cols="30"
                                rows="7"
                                placeholder="Enter description"
                                className={`${isBioEdit ? "edit_mode_style" : ""}`}
                                disabled={!isBioEdit}
                            ></textarea>

                            {/* contact info */}

                            <div className="contact_group">
                                <div className="contact_item">
                                    <div className="img_wrapper">
                                        <img src="/images/icon/p-location.svg" alt="" />
                                    </div>

                                    {/* city  */}
                                    <div className=" drop_down" ref={containerRef7}>
                                        <input
                                            className={`${isBioEdit ? "edit_mode_style" : ""}`}
                                            value={city}
                                            onClick={() => {
                                                setIsCityMenuOpen(!isCityMenuOpen);
                                                setIsHomeMenuOpen(false);
                                                setIsTagMenuOpen(false);
                                            }}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                setIsCityMenuOpen(true);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter City Name"
                                            disabled={!isBioEdit}
                                        />

                                        {isCityMenuOpen && city.length > 2 && isBioEdit && filteredCity?.length > 0 && (
                                            <div className="drop_down_item">
                                                {filteredCity?.map((it) => (
                                                    <li
                                                        key={it.id}
                                                        onClick={() => {
                                                            setIsCityMenuOpen(false);
                                                            setCity(it.title);
                                                        }}
                                                    >
                                                        {" "}
                                                        <label >
                                                            {it.title}{" "}
                                                        </label>{" "}
                                                    </li>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="contact_item">
                                    <div className="img_wrapper">
                                        <img src="/images/icon/p-house.svg" alt="" />
                                    </div>

                                    {/* home  */}
                                    <div className="city_drop_down drop_down" ref={containerRef8}>
                                        <input
                                            className={`${isBioEdit ? "edit_mode_style" : ""}`}
                                            value={home}
                                            onClick={() => {
                                                setIsHomeMenuOpen(!isHomeMenuOpen);
                                                setIsCityMenuOpen(false);
                                                setIsTagMenuOpen(false);
                                            }}
                                            onChange={(e) => {
                                                setHome(e.target.value);
                                                setIsHomeMenuOpen(true);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter Country"
                                            disabled={!isBioEdit}
                                        />

                                        {isHomeMenuOpen && home.length > 2 && isBioEdit && filteredCountry?.length > 0 && (
                                            <div className="drop_down_item">
                                                {filteredCountry?.map((it) => (
                                                    <li key={it.id} onClick={() => {
                                                        setIsHomeMenuOpen(false)
                                                        setHome(it.title)
                                                    }}>
                                                        {" "}

                                                        <label htmlFor={`home${it.id}`}>{it.title} </label>{" "}
                                                    </li>
                                                ))}


                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* tag  */}
                                <div className="contact_item" ref={containerRef9}>
                                    <div className="img_wrapper">
                                        <img src="/images/icon//p-heart.svg" alt="" />
                                    </div>

                                    <div className=" drop_down d-block w-100 ">
                                        <input
                                            className={`d-block w-100 ${isBioEdit ? "edit_mode_style" : ""
                                                }`}
                                            value={loveTag}
                                            onClick={() => {
                                                setIsTagMenuOpen(!isTagMenuOpen);
                                                setIsHomeMenuOpen(false);
                                                setIsCityMenuOpen(false);
                                                setIsHomeMenuOpen(false);
                                            }}
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter tag "
                                            disabled={!isBioEdit}
                                        />

                                        {isTagMenuOpen && isBioEdit && (
                                            <div className="drop_down_item">
                                                {[
                                                    { id: 1, title: "Photography" },
                                                    { id: 2, title: "Design" },
                                                    { id: 3, title: "Music" },
                                                    { id: 4, title: "Roadtrips" },
                                                    { id: 5, title: "Biking" },
                                                ]?.map((it) => (
                                                    <Tag key={it.id} item={it} handleTag={handleTag} />
                                                ))}

                                                <div className="btn_group">
                                                    <button
                                                        className="add_btn"
                                                        onClick={() => {
                                                            setIsTagMenuOpen(false);
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        className="delete_btn"
                                                        onClick={() => {
                                                            setLoveTag("");
                                                            setIsTagMenuOpen(false);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Donations */}
                            {
                                <div
                                    ref={containerRef6}
                                    className={`donation  ${paypalUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <h6>Donations</h6>
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(!isPaypalModalOpen);
                                            setIsInstagramModalOpen(false);
                                            setIsPinterestModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsYoutubeModalOpen(false);
                                            setIsFacebookModalOpen(false);
                                        }}
                                        className="paypal_btn"
                                    >
                                        {" "}
                                        <img src="/images/social-icon/paypal.png" alt="" /> Pay
                                        <span>Pal.me</span>
                                    </button>

                                    {isPaypalModalOpen && isBioEdit && (
                                        <div className="paypal_input_modal media_common">
                                            <label htmlFor="">Paypal Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setPaypalUrl(e.target.value)}
                                                value={paypalUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsPaypalModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setPaypalUrl("");
                                                        setIsPaypalModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }

                            {/* Social Media*/}
                            <h6>Socials</h6>
                            <div className="social_media_group">
                                {/* instagram */}
                                <div
                                    className={`  ${instagramUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                    ref={containerRef}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(!isInstagramModalOpen);
                                            setIsPinterestModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsYoutubeModalOpen(false);
                                            setIsFacebookModalOpen(false);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img
                                            src="/images/social-icon/instagram.png"
                                            alt="instagram"
                                        />
                                    </button>

                                    {isInstagramModalOpen && isBioEdit && (
                                        <div className="media_common instagram_modal">
                                            <label htmlFor="">Instagram Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setInstagramUrl(e.target.value)}
                                                value={instagramUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsInstagramModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setInstagramUrl("");
                                                        setIsInstagramModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* youtube */}
                                <div
                                    ref={containerRef2}
                                    className={`  ${youtubeUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(false);
                                            setIsPinterestModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsYoutubeModalOpen(!isYoutubeModalOpen);
                                            setIsFacebookModalOpen(false);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img src="/images/social-icon/youtube.png" alt="youtube" />
                                    </button>

                                    {isYoutubeModalOpen && isBioEdit && (
                                        <div className="media_common ">
                                            <label htmlFor="">Youtube Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                                value={youtubeUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsYoutubeModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setYoutubeUrl("");
                                                        setIsYoutubeModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Pinterest */}
                                <div
                                    ref={containerRef3}
                                    className={`  ${pinterestUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(false);
                                            setIsPinterestModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsPinterestModalOpen(!isPinterestModalOpen);
                                            setIsFacebookModalOpen(false);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img
                                            src="/images/social-icon/pinterest.png"
                                            alt="Pinterest"
                                        />
                                    </button>

                                    {isPinterestModalOpen && isBioEdit && (
                                        <div className="media_common ">
                                            <label htmlFor="">Pinterest Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setPinterestUrl(e.target.value)}
                                                value={pinterestUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsPinterestModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setPinterestUrl("");
                                                        setIsPinterestModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Twitter */}
                                <div
                                    ref={containerRef4}
                                    className={`  ${twitterUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsTwitterModalOpen(!isTwitterModalOpen);
                                            setIsFacebookModalOpen(false);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img src="/images/social-icon/twitter.png" alt="twitter" />
                                    </button>

                                    {isTwitterModalOpen && isBioEdit && (
                                        <div className="media_common ">
                                            <label htmlFor="">Twitter Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setTwitterUrl(e.target.value)}
                                                value={twitterUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsTwitterModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setTwitterUrl("");
                                                        setIsTwitterModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Facebook */}
                                <div
                                    ref={containerRef5}
                                    className={`  ${facebookUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(false);
                                            setIsYoutubeModalOpen(false);
                                            setIsTwitterModalOpen(false);
                                            setIsFacebookModalOpen(!isFacebookModalOpen);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img
                                            src="/images/social-icon/facebook.png"
                                            alt="facebook"
                                        />
                                    </button>

                                    {isFacebookModalOpen && isBioEdit && (
                                        <div className="media_common ">
                                            <label htmlFor="">Facebook Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setFacebookUrl(e.target.value)}
                                                value={facebookUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsFacebookModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setFacebookUrl("");
                                                        setIsFacebookModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* <Link to="#">
                  <img src="/images/social-icon/twitter.png" alt="twitter" />
                </Link>
                <Link to="#">
                  <img src="/images/social-icon/facebook.png" alt="facebook" />
                </Link> */}
                            </div>
                        </div>

                        <button
                            className="edit_btn"
                            onClick={() => updateProfile()}
                        >
                            <img
                                src={`/images/icon/${isBioEdit ? "checkmark.png" : "edit-pen.png"
                                    }`}
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detail;
