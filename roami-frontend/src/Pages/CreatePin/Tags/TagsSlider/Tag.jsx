import React, { useState } from "react";

const Tag = ({ tag, handleTagId, selectedTags }) => {
  const [select, setSelect] = useState(false);
  const handleSelect = () => {
    handleTagId(tag?.id);
    setSelect(!select);
  };
  return (
    <div className="slide">
      <button
        type="button"
        className={`${select ? "selected" : ""} `}
        to="#"
        onClick={handleSelect}
        disabled={selectedTags?.length === 6 && select === false}
      >
        <div className="tag_item">
          <div className="img_wrapper">
            <img src={tag.img} alt="" />
          </div>

          <span>{tag.title}</span>
        </div>
      </button>
    </div>
  );
};

export default Tag;
