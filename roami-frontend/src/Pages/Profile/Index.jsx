import React, { useEffect, useState } from "react";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";
import Lists from "../../Components/Common/Lists/Lists";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import FollowedLists from "../../Components/Common/FollowedLists/FollowedLists";
import Footer from "../../Components/Global/Footer/Footer";
import Detail from "./Detail/Detail";
import { useNavigate } from "react-router-dom";
import { backendHost } from "../../App";

const Profile = () => {
    const [lists, setLists] = useState();
    const [followedLists, setFollowedLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("access");

    const getUserLists = async () => {
        if (!accessToken) {
            navigate('/sign-in');
        }

        const response = await fetch(`${backendHost}/user/places/`, {
            method: "GET",
            headers: {
                "Authorization": `jwt ${accessToken}`
            }
        })
        const data = await response.json();
        console.log(data);
        setLists(data.results);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserLists();
    }, []);
      
    return (
        <>
            <Navbar />
            <main>
                <GotoHomePage />
                <Detail />
                <Lists btnType={"edit"} listsData={lists} />
                <FollowedLists />
                <MobileNavbar />
            </main>

            <Footer />
        </>
    );
};

export default Profile;
