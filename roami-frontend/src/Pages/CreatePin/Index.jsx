import React, { useEffect, useState } from "react";
import CreatePinTopText from "./CreatePinTopText/CreatePinTopText";
import PinForm from "./PinForm/PinForm";
import Tags from "./Tags/Tags";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import Footer from "../../Components/Global/Footer/Footer";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";
import { allTags, backendHost } from "../../App";
import { useNavigate } from "react-router-dom";

const CreatePin = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const [locationLink, setLocationLink] = useState("");
    const [name, setName] = useState("");
    // const [locationName, setLocationName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const pictures = [
        { id: 1, state: useState(null) },
        { id: 2, state: useState(null) },
        { id: 3, state: useState(null) },
        { id: 4, state: useState(null) },
        { id: 5, state: useState(null) },
        { id: 6, state: useState(null) },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("access");
        if (!accessToken) {
            navigate("/sign-in");
        }
    })

    const isValidURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(url);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("access");

        const tagList = selectedTags.map((tagId) =>
            allTags.find((tag) => tag.id === tagId)
        );

        const tags = tagList.map((tag) => tag.title);
        const picFiles = pictures.map((pic) => pic.state[0]);

        if (city === "" || country === "") {
            setErrorMsg("Please select a country and a city");
            return;
        } 
        else if (!isValidURL(locationLink)) {
            setErrorMsg("Please enter a valid link");
            return;
        } 
        else if (picFiles[0] === null) {
            setErrorMsg("Please select at least one photo");
            return;
        }
        else if (accessToken === "" || accessToken === null) {
            navigate("/sign-in");
        }
        else {
            setErrorMsg("");
        }

        const formData = new FormData();
        // Add all fields to formdata
        formData.append("category", "drinks") // TODO: Fake placeholder, fix later.

        formData.append("location_link", locationLink);
        formData.append("place_name", name);
        formData.append("place_name_slug", name.toLowerCase().replace(" ", "-"));
        formData.append("city", city);
        formData.append("country", country);
        formData.append("description", description);
        formData.append("tags", tags);

        formData.append("photo_1", picFiles[0]);

        if (picFiles[1] !== null)
            formData.append("photo_2", picFiles[1]);
        if (picFiles[2] !== null)
            formData.append("photo_3", picFiles[2]);
        if (picFiles[3] !== null)
            formData.append("photo_4", picFiles[3]);
        if (picFiles[4] !== null)
            formData.append("photo_5", picFiles[4]);
        if (picFiles[5] !== null)
            formData.append("photo_6", picFiles[5]);

        fetch(`${backendHost}/add/place/`, {
            method: "POST",
            headers: {
                "Authorization": `jwt ${accessToken}`
            },
            body: formData
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.success === true) {
                    navigate(`/pin/${data.result.id}`)
                }
            })
        })
    };
    return (
        <>
            <Navbar />
            <main>
                <GotoHomePage />
                <CreatePinTopText />

                <form action="" onSubmit={handleSubmit}>
                    <PinForm
                        locationLinkState={[locationLink, setLocationLink]}
                        nameState={[name, setName]}
                        cityState={[city, setCity]}
                        countryState={[country, setCountry]}
                        descriptionState={[description, setDescription]}
                    />
                    <Tags setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
                    <PhotoUpload pictures={pictures} errorMsg={errorMsg} />
                </form>

                <MobileNavbar />
            </main>
            <Footer />
        </>
    );
};

export default CreatePin;
