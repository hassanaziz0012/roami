import React from "react";
import "./MobileSearchBar.scss";
import SearchBar from "../SearchBar";

const MobileSearchBar = () => {
    return (
        <div id="mobile_search_bar" className="sticky-top bg-white" >
            <SearchBar />

        </div>
    );
};

export default MobileSearchBar;
