import React from "react";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import MobileNavbar from "../../Components/Global/Navbar/MobileNavbar/MobileNavbar";
import Footer from "../../Components/Global/Footer/Footer";
import GotoHomePage from "../../Components/Common/GotoHomePage/GotoHomePage";
import Navbar from "../../Components/Global/Navbar/Navbar";

const About = () => {
  return (
    <>
    <Navbar />
      <main>
      <GotoHomePage/>
        <Section1 />
        <Section2 />
        <Section3 />
        <MobileNavbar />
      </main>
      <Footer />
    </>
  );
};

export default About;
