import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { backendHost } from "../../../App";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isShowDropdown, setIsShowDropdown] = useState(false);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const searchValue = urlParams.get("search");
    useEffect(() => {
        if (searchValue) {
            setSearchInput(searchValue);
        }
    }, [searchValue]);

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendHost}/place/search/?search=${searchInput}`);
                const jsonData = await response.json();
                setData(jsonData.results);
            } catch (error) {
                // console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [searchInput]);

    const filteredPins = data.filter((pin) =>
        pin.place_name.toLowerCase().includes(searchInput.toLowerCase()) || 
        pin.city.toLowerCase().includes(searchInput.toLowerCase()) ||
        pin.country.toLowerCase().includes(searchInput.toLowerCase())
    );

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsShowDropdown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div id="search_bar">
            <div
                className="search_bar"
                onClick={() => setIsShowDropdown(!isShowDropdown)}
            >
                <input
                    type="text"
                    placeholder="where are you going?"
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                        setIsShowDropdown(true);
                    }}
                />
                <button className="search_btn">
                    <img className="img-fluid" src="/images/icon/search.svg" alt="" />
                </button>
            </div>

            {isShowDropdown && searchInput.length > 2 && filteredPins.length > 0 && (
                <div className="suggestion" ref={containerRef}>
                    <div className="suggestion_contents_wrapper">
                        {filteredPins.map((item, index) => (
                            <span key={index} onClick={() => {
                                navigate(`/pin/${item.id}`);
                                navigate(0);
                            }}>
                                {item.place_name}, <span> {item.city}, {item.country}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
