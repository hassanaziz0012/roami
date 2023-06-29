import React, { useEffect, useState } from "react";
import PinForm from "./PinForm/PinForm";
import Tags from "./Tags/Tags";
import PhotoUpload from "./PhotoUpload/PhotoUpload";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import Footer from "../../Components/Global/Footer/Footer";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import EditPinTopText from "./EditPinTopText/EditPinTopText";
import { allTags, backendHost } from "../../App";

const EditPin = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [data, setData] = useState([]);

    const [locationLink, setLocationLink] = useState("");
    const [name, setName] = useState("");
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

    const params = useParams();
    const { listId } = params;

    const navigate = useNavigate();

    const isValidURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(url);
    }

    const fetchAndCreateFileObject = async (url) => {
        // fetch(url)
        //     .then(res => res.blob())
        //     .then(blob => {
        //         const filename = url.substring(url.lastIndexOf('/') + 1);
        //         const file = new File([blob], filename, { type: "image/png" });

        //         return file;
        //     })
        const response = await fetch(url);
        const blob = await response.blob();
      
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const file = new File([blob], filename, { type: "image/png" });
      
        return file;
    }

    // fetch data
    useEffect(() => {
        fetch(`${backendHost}/place/${listId}/update/`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);

                setLocationLink(data.location_link);
                setName(data.place_name);
                setCity(data.city);
                setCountry(data.country);
                setDescription(data.description);

                const tagIds = [];
                let tagNames = data.tags

                for (const tagName of tagNames) {
                    const tag = allTags.find(t => t.title === tagName);
                    if (tag) {
                    tagIds.push(tag.id);
                    }
                }
                console.log(tagNames);
                console.log(tagIds);
                setSelectedTags(tagIds);

                pictures[0].state[1](data.photo_1);
                pictures[1].state[1](data.photo_2);
                pictures[2].state[1](data.photo_3);
                pictures[3].state[1](data.photo_4);
                pictures[4].state[1](data.photo_5);
                pictures[5].state[1](data.photo_6);

            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("access");

        const tagList = selectedTags.map((tagId) =>
            allTags.find((tag) => tag.id === tagId)
        );

        const tags = tagList.map((tag) => tag.title).join(", ");
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

        console.log(picFiles)

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
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        fetch(`${backendHost}/place/${listId}/update/`, {
            method: "PATCH",
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
                <EditPinTopText />

                <form action="" onSubmit={handleSubmit}>
                    <PinForm
                        locationLinkState={[locationLink, setLocationLink]}
                        nameState={[name, setName]}
                        cityState={[city, setCity]}
                        countryState={[country, setCountry]}
                        descriptionState={[description, setDescription]}
                    />
                    <Tags setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
                    <PhotoUpload pictures={pictures} />
                </form>

                <MobileNavbar />
            </main>
            <Footer />
        </>
    );
};

export default EditPin;
