import React, { useEffect, useState } from "react";
import "./UploadCard.scss";

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
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObj(e.target.files[0])
    };
    return (
        <div id="photo">
            <form
                action=""
                onClick={() => document.querySelector(`.file_input${number}`).click()}
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
                    onClick={() => setFile("")}
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
