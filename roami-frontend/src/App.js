import React, { useEffect, useState } from "react";
import "./Common.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, useLocation } from "react-router-dom";
import CreatePin from "./Pages/CreatePin/Index";
import About from "./Pages/About/Index";
import Home from "./Pages/Home/Index";
import SignIn from "./Pages/SignIn/Index";
import EmailSignIn from "./Pages/EmailSignIn/Index";
import SignUp from "./Pages/SignUp/Index";
import EditPin from "./Pages/EditPin/Index";
import Profile from "./Pages/Profile/Index";
import UserProfile from "./Pages/UserProfile/Index";
import PinDetail from "./Pages/Pin";


export const backendHost = "http://127.0.0.1:8000/api/v1"

export const allTags = [
    {
        id: 1,
        img: "/images/tags/sunset.svg",
        title: "Sunset Spots",
    },
    {
        id: 2,
        img: "/images/tags/swimming.svg",
        title: "Swimming",
    },
    {
        id: 3,
        img: "/images/tags/museum.svg",
        title: "Museum",
    },
    {
        id: 4,
        img: "/images/tags/shopping-bag.svg",
        title: "Shopping",
    },
    {
        id: 5,
        img: "/images/tags/car.svg",
        title: "Free Parking",
    },
    {
        id: 6,
        img: "/images/tags/sunset.svg",
        title: "Sunset Spots",
    },
    {
        id: 7,
        img: "/images/tags/swimming.svg",
        title: "Swimming",
    },
    {
        id: 8,
        img: "/images/tags/plattforms.svg",
        title: "Viewing Plattforms",
    },
    {
        id: 9,
        img: "/images/tags/drinks.svg",
        title: "Drinks",
    },
    {
        id: 10,
        img: "/images/tags/food.svg",
        title: "Food",
    },
    {
        id: 11,
        img: "/images/tags/accomondation.svg",
        title: "Accomondation",
    },
    {
        id: 12,
        img: "/images/tags/theater.svg",
        title: "Theater",
    },
    {
        id: 13,
        img: "/images/tags/popcorn.svg",
        title: "Cinema",
    },
    {
        id: 14,
        img: "/images/tags/park.svg",
        title: "Parks",
    },
    {
        id: 15,
        img: "/images/tags/plattforms.svg",
        title: "Viewing Plattforms",
    },
    {
        id: 16,
        img: "/images/tags/sunset.svg",
        title: "Sunset Spots",
    },
    {
        id: 17,
        img: "/images/tags/swimming.svg",
        title: "Swimming",
    },
    {
        id: 18,
        img: "/images/tags/museum.svg",
        title: "Museum",
    },
    {
        id: 19,
        img: "/images/tags/party.svg",
        title: "Jibbo friendly",
    },
    {
        id: 20,
        img: "/images/tags/car.svg",
        title: "Free Parking",
    },
    {
        id: 21,
        img: "/images/tags/sunset.svg",
        title: "Sunset Spots",
    },
    { id: 22, img: "/images/tags/swimming.svg", title: "Swimming" },
    { id: 23, img: "/images/tags/plattforms.svg", title: "Viewing Plattforms" },
    { id: 24, img: "/images/tags/drinks.svg", title: "Drinks" },
    { id: 25, img: "/images/tags/food.svg", title: "Food" },
    {
        id: 26,
        img: "/images/tags/accomondation.svg",
        title: "Accomondation",
    },
    { id: 27, img: "/images/tags/theater.svg", title: "Theater" },
    { id: 28, img: "/images/tags/popcorn.svg", title: "Cinema" },
    { id: 29, img: "/images/tags/park.svg", title: "Parks" },
    { id: 30, img: "/images/tags/plattforms.svg", title: "Viewing Plattforms" },
];

function App() {
    const [userInputEmail, setUserInputEmail] = useState("");

    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-profile/:userId" element={<UserProfile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/edit-pin/:listId" element={<EditPin />} />
                <Route path="/pin/:pinId" element={<PinDetail />} />
                <Route path="/create-pin/" element={<CreatePin />} />
                {/* <Route
                    path="/sign-in"
                    element={
                        <SignIn
                            setUserInputEmail={setUserInputEmail}
                            userInputEmail={userInputEmail}
                        />
                    }
                /> */}
                <Route
                    path="/sign-in"
                    element={
                        <EmailSignIn
                            userInputEmail={userInputEmail}
                            setUserInputEmail={setUserInputEmail}
                        />
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <SignUp
                            userInputEmail={userInputEmail}
                            setUserInputEmail={setUserInputEmail}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
