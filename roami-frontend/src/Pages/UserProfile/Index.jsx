import React from "react";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";
import Lists from "../../Components/Common/Lists/Lists";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import Footer from "../../Components/Global/Footer/Footer";
import Detail from "./Detail/Detail";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const params = useParams();
    const { userId } = params;

    const listsData = [
        {
            id: 1,
            title: "Burger Love",
            img: "/images/list/list1.png",
            location: "Italy",
            rating: 0,
        },
        {
            id: 2,
            title: "Romantic Spots",
            img: "/images/list/list2.png",
            location: "Italy",
            rating: 0,
        },
        {
            id: 3,
            title: "Nightlife",
            img: "/images/list/list3.png",
            location: "Italy",
            rating: 4.5,
        },
        {
            id: 4,
            title: "Free Parking",
            img: "/images/list/list4.png",
            location: "Italy",
            rating: 0,
        },
        {
            id: 5,
            title: "Burger Love",
            img: "/images/list/list1.png",
            location: "Italy",
            rating: 0,
        },
        {
            id: 6,
            title: "Romantic Spots",
            img: "/images/list/list2.png",
            location: "Italy",
            rating: 0,
        },
        {
            id: 7,
            title: "Nightlife",
            img: "/images/list/list3.png",
            location: "Italy",
            rating: 4.5,
        },
        {
            id: 8,
            title: "Free Parking",
            img: "/images/list/list4.png",
            location: "Italy",
            rating: 0,
        },
    ];
    return (
        <>
            <Navbar />
            <main>
                <GotoHomePage />
                <Detail userId={userId} />
                <Lists listsData={listsData} />

                <MobileNavbar />
            </main>

            <Footer />
        </>
    );
};

export default UserProfile;
