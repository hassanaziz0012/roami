import React from "react";
import { LeftArrowNavigate } from "../../../Icon";
import { Link, useLocation } from "react-router-dom";
import "./GotoHomePage.scss";

const GotoHomePage = () => {
    const location = useLocation();
    return (
        <div className="sticky-top bg-white">
            <div id="back_home_link">
                <Link to="/" state={{ from: location }} replace>
                    <LeftArrowNavigate />
                </Link>
            </div>
        </div>
    );
};

export default GotoHomePage;
