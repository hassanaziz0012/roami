import React, { useEffect, useState } from "react";
import Pin from "./Pin/Pin";
import "./Pins.scss";
import ModalDetailed from "../../../Components/Common/Modal/ModalContents/ModalDetailed";
import { Modal } from "react-bootstrap";

const Pins = ({ data,isLoading }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // let contents;
  // if()

  return (
    <section id="pins">
      {
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ModalDetailed />
          </Modal.Body>
        </Modal>
      }
      <div className="container">
        { isLoading && <div className="loader"></div>}
        {data?.length === 0 && !isLoading && <p className="text-center no_found_text">No Data Found!</p>}
        <div className={`pins-wrapper ${show ? "pins-wrapper_blur" : ""} `}>
          {data?.map((item, index) => (
            <Pin setShow={setShow} key={index} pin={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pins;
