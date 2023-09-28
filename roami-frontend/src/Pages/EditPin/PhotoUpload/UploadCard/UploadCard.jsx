import React, { useEffect, useRef, useState } from "react";
import "./UploadCard.scss";
import { Button, Form, Modal } from "react-bootstrap";
import CroppedImageUpload from "../../../../Components/Common/CroppedImageUpload/CroppedImageUpload";

const UploadCard = ({ number, fileUrl, setFileObj }) => {
    const [file, setFile] = useState();
    useEffect(() => {
        if (fileUrl instanceof File) {
            setFile(URL.createObjectURL(fileUrl))
        } else {
            setFile(fileUrl);
        }
    }, [fileUrl]);

    const getFile = (e) => {
        // setFile(URL.createObjectURL(e.target.files[0]));
        // setFileObj(e.target.files[0])
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    };

    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [resultBlob, setResultBlob] = useState();
    const blobRef = useRef(null);
    const setCroppedResult = (blob) => {
        setResultBlob(blob);
        const file = new File([blob], "photo.png")
        setFile(URL.createObjectURL(file));
        setFileObj(file);
    }

     // modal stuff
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
 
     function selectCroppedImage() {
         if (!blobRef.current) {
             throw new Error('Crop canvas does not exist')
         }
 
         blobRef.current.toBlob((blob) => {
             if (!blob) {
                 throw new Error('Failed to create blob')
             }
             // if (blobUrlRef.current) {
             //     URL.revokeObjectURL(blobUrlRef.current)
             // }
             setCroppedResult(blob);
             setShow(false);
             // blobUrlRef.current = URL.createObjectURL(blob)
             // hiddenAnchorRef.current.href = blobUrlRef.current
             // hiddenAnchorRef.current.click()
         })
     }
    return (
        <div id="photo">
            <Modal show={show} onHide={handleClose} centered style={{ background: "#fff" }}>
                <Modal.Header>
                    <h2>Crop image</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="profile_pic_upload_input mb-3">
                        <Form.Control type="file" onChange={getFile} accept="image/*" />
                    </Form.Group>
                    <CroppedImageUpload imgSrcState={[imgSrc, setImgSrc]} cropState={[crop, setCrop]} blobRef={blobRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={selectCroppedImage}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            <form
                action=""
                onClick={handleShow}
            >
                <input
                    type="file"
                    onChange={getFile}
                    className={`file_input${number}`}
                    name=""
                    id=""
                    accept="image/*"
                    hidden
                />
                {file ? (
                    <img className="input_photo" src={file} alt="" />
                ) : (
                    <img
                        className="placeholder_photo"
                        src="/images/icon/plus.png"
                        alt=""
                    />
                )}
            </form>

            {file && (
                <button
                    onClick={() => {
                        setFile("");
                        setFileObj(null);
                    }}
                    type="button"
                    className="delete_btn"
                >
                    <img src="/images/icon/cross.png" alt="" />
                </button>
            )}
        </div>
    );
};

export default UploadCard;
