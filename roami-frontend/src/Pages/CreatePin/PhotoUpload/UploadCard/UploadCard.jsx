import React, { useState } from "react";
import "./UploadCard.scss";

const UploadCard = ({ number, setFileObj }) => {
    const [file, setFile] = useState("");
    const getFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setFileObj(e.target.files[0]);
    };
    return (
        <div id="edit_photo">
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
