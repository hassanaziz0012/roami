import React, { useEffect, useState } from "react";
import TagsSlider from "./TagsSlider/TagsSlider";
import Pins from "./Pins/Pins";
import FooterBottomText from "../../Components/Global/FooterBottomText/FooterBottomText";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import MobileSearchBar from "../../Components/Common/SearchBar/MobileSearchBar/MobileSearchBar";
import Navbar from "../../Components/Global/Navbar/Navbar";

const Home = () => {
  const [filteredPins, setFilteredPins] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/pins.json");
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);

      } catch (error) {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredPins = data?.filter((pin) =>
      pin?.tags?.some((tag) => selectedTags.includes(tag))
    );
    if (selectedTags?.length === 0) {
      setFilteredPins(data);
    } else {
      setFilteredPins(filteredPins);
    }
  }, [selectedTags, data]);

  return (
    <>
      <Navbar />
      <MobileSearchBar />
      <main>
        <TagsSlider
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        <Pins data={filteredPins} isLoading={isLoading}/>
        <MobileNavbar />
      </main>
      <FooterBottomText />
    </>
  );
};

export default Home;
