import React, { useEffect, useState } from "react";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";
import Lists from "../../Components/Common/Lists/Lists";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import Footer from "../../Components/Global/Footer/Footer";
import Detail from "./Detail/Detail";
import { useParams } from "react-router-dom";
import { backendHost } from "../../App";

const UserProfile = () => {
    const params = useParams();
    const { userId } = params;

    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserLists = async () => {
        const response = await fetch(`${backendHost}/user/places/?user_id=${userId}`)
        const data = await response.json();
        console.log(data);
        setLists(data.results);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserLists();
    }, [])

    return (
        <>
            <Navbar />
            <main>
                <GotoHomePage />
                <Detail userId={userId} />
                <Lists listsData={lists} />

                <MobileNavbar />
            </main>

            <Footer />
        </>
    );
};

export default UserProfile;
