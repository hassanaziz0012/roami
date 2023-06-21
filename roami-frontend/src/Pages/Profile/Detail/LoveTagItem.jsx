import React, { useState } from "react";

const Tag = ({ handleTag, item }) => {
  const { title,id } = item || {};
  const [select, setSelected] = useState(false);
  const handleSelect = () => {
    handleTag(title);
    setSelected(!select);
  };
  return (
    <li >
      {" "}
      <input id={`tag${id}`} type="checkbox"  name=""  />{" "}
      <label onClick={handleSelect} htmlFor={`tag${id}`}>{title} </label>{" "}
    </li>
  );
};

export default Tag;