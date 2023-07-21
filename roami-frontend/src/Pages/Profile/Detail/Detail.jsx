import React, { useEffect, useRef, useState } from "react";
import "./Detail.scss";
import Tag from "./LoveTagItem";
import { backendHost } from "../../../App";
import { useNavigate } from "react-router-dom";
import CroppedImageUpload from "../../../Components/Common/CroppedImageUpload/CroppedImageUpload";
import { Button, Form, Modal } from "react-bootstrap";


const Detail = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [isBioEdit, setIsBioEdit] = useState(false);
    const [isBioEditFinished, setIsBioEditFinished] = useState(false);
    const [defaultInterests, setDefaultInterests] = useState([]);
    
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [resultBlob, setResultBlob] = useState();
    const blobRef = useRef(null);
    const setCroppedResult = (blob) => {
        setResultBlob(blob);
        setFile(URL.createObjectURL(blob));
        setFileObj(blob);
    }

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
        ""
    );

    //handle social media useState
    const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
    const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
    const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
    const [isTiktokModalOpen, setIsTiktokModalOpen] = useState(false);

    const [paypalUrl, setPaypalUrl] = useState("jhone11");
    const [instagramUrl, setInstagramUrl] = useState("jhone111");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [tiktokUrl, setTiktokUrl] = useState("");

    const navigate = useNavigate();

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
                    setName(data.first_name);
                    setDescription(data.profile.bio || "");
                    setCity(data.profile.city);
                    setHome(data.profile.country);
                    setSelectedTags(data.profile.interests);

                    setPaypalUrl(data.profile.paypal);
                    setInstagramUrl(data.profile.instagram);
                    setYoutubeUrl(data.profile.youtube);
                    setTiktokUrl(data.profile.tiktok);

                    setIsBioEditFinished(false);
                    
                })
            })
        }
    }

    const updateProfile = () => {
        console.log(selectedTags);
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
                    interests: selectedTags,
                    tiktok: tiktokUrl,
                    instagram: instagramUrl,
                    youtube: youtubeUrl,
                })
            }).then((res) => {
                res.json().then((data) => {
                    setIsBioEditFinished(true);
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
    }, [isBioEditFinished])

    useEffect(() => {
        const updatedTags = selectedTags.join(" , ");
        if (selectedTags.length > 0) {
            setLoveTag(updatedTags);
        }
    }, [selectedTags]);

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch('interests.json');
            const data = await resp.json();
            console.log(data);
            setDefaultInterests(data);
        }

        getData();
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate('/');
    }

    //handle social media
    const socialMedia = {
        instagram: instagramUrl,
        youtube: youtubeUrl,
        paypal: paypalUrl,
        tiktok: tiktokUrl
    };

    // modal stuff
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //profile pic
    const [file, setFile] = useState("/images/profile/mainprofile.png");
    const [fileObj, setFileObj] = useState(null);

    const getFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            // setFile(URL.createObjectURL(e.target.files[0]));
            // setFileObj(e.target.files[0]);
    
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    };

    function selectCroppedImage() {
        if (!blobRef.current) {
            throw new Error('Crop canvas does not exist')
        }

        blobRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            // if (blobUrlRef.current) {
            //     URL.revokeObjectURL(blobUrlRef.current)
            // }
            setCroppedResult(blob);
            setShow(false);
            // blobUrlRef.current = URL.createObjectURL(blob)
            // hiddenAnchorRef.current.href = blobUrlRef.current
            // hiddenAnchorRef.current.click()
        })
    }

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

    // tiktok
    const containerRef3 = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef3.current &&
                !containerRef3.current.contains(event.target)
            ) {
                setIsTiktokModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    // twitter
    // const containerRef4 = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             containerRef4.current &&
    //             !containerRef4.current.contains(event.target)
    //         ) {
    //             setIsTwitterModalOpen(false);
    //         }
    //     };

    //     document.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // facebook
    // const containerRef5 = useRef(null);
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             containerRef5.current &&
    //             !containerRef5.current.contains(event.target)
    //         ) {
    //             setIsFacebookModalOpen(false);
    //         }
    //     };

    //     document.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

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

            <Modal show={show} onHide={handleClose} centered style={{ background: "#fff" }}>
                <Modal.Header>
                    <h2>Crop image</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="profile_pic_upload_input mb-3">
                        <Form.Control type="file" onChange={getFile} accept="image/*" />
                    </Form.Group>
                    <CroppedImageUpload imgSrcState={[imgSrc, setImgSrc]} cropState={[crop, setCrop]} blobRef={blobRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={selectCroppedImage}>Save changes</Button>
                </Modal.Footer>
            </Modal>

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
                                    
                                    <button className="profile_pic_input" onClick={handleShow} style={{ border: 'none' }}>
                                        <img src="/images/icon/camera.png" alt="" />
                                    </button>
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

                            <button className="follow_btn" onClick={logout}>Log out</button>
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
                                                {defaultInterests?.map(it => (
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
                                    <h6>Say Thank You</h6>
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(!isPaypalModalOpen);
                                            setIsInstagramModalOpen(false);
                                            setIsYoutubeModalOpen(false);
                                            setIsTiktokModalOpen(false);
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
                                            setIsYoutubeModalOpen(false);
                                            setIsTiktokModalOpen(false);
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
                                            setIsYoutubeModalOpen(!isYoutubeModalOpen);
                                            setIsTiktokModalOpen(false);
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

                                {/* Tiktok */}
                                <div
                                    ref={containerRef3}
                                    className={`  ${tiktokUrl || isBioEdit ? "" : "d-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setIsPaypalModalOpen(false);
                                            setIsInstagramModalOpen(false);
                                            setIsTiktokModalOpen(!isTiktokModalOpen);
                                        }}
                                        className=""
                                    >
                                        {" "}
                                        <img
                                            src="/images/social-icon/tiktok.png"
                                            alt="Tiktok"
                                        />
                                    </button>

                                    {isTiktokModalOpen && isBioEdit && (
                                        <div className="media_common ">
                                            <label htmlFor="">Tiktok Url</label>
                                            <input
                                                type="text"
                                                placeholder=" E.g jone123"
                                                onChange={(e) => setTiktokUrl(e.target.value)}
                                                value={tiktokUrl}
                                            />

                                            <div className="btn_group">
                                                <button
                                                    onClick={() => {
                                                        setIsTiktokModalOpen(false);
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setTiktokUrl("");
                                                        setIsTiktokModalOpen(false);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Twitter */}
                                {/* <div
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
                                </div> */}

                                {/* Facebook */}
                                {/* <div
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
                                </div> */}

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
