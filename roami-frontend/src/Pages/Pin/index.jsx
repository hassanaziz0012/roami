import React, { useEffect, useState } from "react";
import ModalDetailed from "../../Components/Common/Modal/ModalContents/ModalDetailed";
import Navbar from "../../Components/Global/Navbar/Navbar";
import Footer from "../../Components/Global/Footer/Footer";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import { useParams } from "react-router-dom";
import { backendHost } from "../../App";

const PinDetail = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const { pinId } = params;

    const getPinData = () => {
        fetch(`${backendHost}/place/${pinId}/update`, {
            method: "GET",

        })
        .then(res => res.json())
        .then(pinData => {
            console.log(pinData);
            setData(pinData);
        })
    }

    useEffect(() => {
        getPinData();
    }, [])

    return (
        <>
            <Navbar />
            <GotoHomePage />
            <main className="container py-2 pb-5 pb-md-0 py-md-5 my-md-5">
                <ModalDetailed data={data} user={data.user} />
            </main>

            <Footer />
        </>
    );
};

export default PinDetail;
