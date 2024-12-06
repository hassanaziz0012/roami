import React, { useEffect, useState } from "react";
import TagsSlider from "./TagsSlider/TagsSlider";
import Pins from "./Pins/Pins";
import FooterBottomText from "../../Components/Global/FooterBottomText/FooterBottomText";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import MobileSearchBar from "../../Components/Common/SearchBar/MobileSearchBar/MobileSearchBar";
import Navbar from "../../Components/Global/Navbar/Navbar";
import { allTags, backendHost } from "../../App";
import CroppedImageUpload from '../../Components/Common/CroppedImageUpload/CroppedImageUpload';

const Home = () => {
    const [filteredPins, setFilteredPins] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch("/pins.json");
                const response = await fetch(`${backendHost}/places/`)
                const jsonData = await response.json();
                console.log(jsonData);
                setData(jsonData.results);
                setIsLoading(false);

            } catch (error) {
                console.log("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredPins = data?.filter((pin) => {
            const tagIds = [];
            let tagNames = pin.tags

            for (const tagName of tagNames) {
                const tag = allTags.find(t => t.title === tagName);
                if (tag) {
                tagIds.push(tag.id);
                }
            }
            console.log(tagIds, tagNames);

            return tagIds.some((tag) => selectedTags.includes(tag))
        });
        if (selectedTags?.length === 0) {
            setFilteredPins(data);
        } else {
            setFilteredPins(filteredPins);
        }
    }, [selectedTags, data]);

    return (
        <>
            <p className="text-center py-2 text-danger fw-bold">
                IMPORTANT! This is only a demo app. I just use this to show potential clients my work. So there's not a lot of data or material on this demo site.
            </p>
            <Navbar />
            <MobileSearchBar />
            <main>
                <TagsSlider
                    setSelectedTags={setSelectedTags}
                    selectedTags={selectedTags}
                />
                <Pins data={filteredPins} isLoading={isLoading} />
                <MobileNavbar />
            </main>
            <FooterBottomText />
        </>
    );
};

export default Home;
