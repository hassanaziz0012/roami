import React, { useState } from "react";
import "./PhotoUpload.scss";
import UploadCard from "./UploadCard/UploadCard";
import { Modal } from "react-bootstrap";
import ModalDetailed from "../../../Components/Common/Modal/ModalContents/ModalDetailed";

const PhotoUpload = ({ pictures, deleteHandler, errorMsg }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <ModalDetailed />
                    </Modal.Body>
                </Modal>
            }

            <section id="e-photo_upload">
                <div className="container">
                    <div className="photo_upload_wrapper">
                        <h2>Photos*</h2>
                        <p>Add at least 1 photo to your places</p>

                        <div className="photos ">
                            {pictures?.map((pic) => (
                                <UploadCard key={pic.id} number={pic.id} setFileObj={pic.state[1]} fileUrl={pic.state[0]} />
                            ))}
                        </div>

                        <p>{errorMsg}</p>

                        <div className="btn_group">
                            <div className="publish_preview_btn">
                                <button type="button" onClick={() => setShow(true)} className="preview_btn">
                                    Preview
                                </button>
                                <button type="submit" className="publish_btn">
                                    Publish
                                </button>
                            </div>
                            <button type="button" className="delete_btn" onClick={deleteHandler}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PhotoUpload;
