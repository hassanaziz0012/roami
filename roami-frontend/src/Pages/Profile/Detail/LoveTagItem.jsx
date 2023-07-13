import React, { useState } from "react";

const Tag = ({ handleTag, item }) => {
  const { name,id } = item || {};
  const [select, setSelected] = useState(false);
  const handleSelect = () => {
    handleTag(name);
    setSelected(!select);
  };
  return (
    <li >
      {" "}
      <input id={`tag${id}`} type="checkbox"  name=""  />{" "}
      <label onClick={handleSelect} htmlFor={`tag${id}`}>{name} </label>{" "}
    </li>
  );
};

export default Tag;