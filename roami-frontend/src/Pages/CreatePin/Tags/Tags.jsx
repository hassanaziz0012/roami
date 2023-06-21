import React from "react";
import "./Tags.scss";
import TagsSlider from "./TagsSlider/TagsSlider";

const Tags = ({ setSelectedTags, selectedTags }) => {

    //handle tag
    const handleTagId = (id) => {
        const findTag = selectedTags?.find((i) => i === id);
        if (findTag) {
            setSelectedTags((prevSelectedTags) =>
                prevSelectedTags.filter((i) => i !== id)
            );
        } else {
            setSelectedTags((prevSelectedTags) => [...prevSelectedTags, id]);
        }
    };

    return (
        <section id="pin_tags">
            <div className="container">
                <div className="pin_tags_contents">
                    <div className="pin_top d-flex align-items-center">
                        <h2>Tags</h2>
                        <button className="selected_btn">
                            Selected ({selectedTags?.length})
                        </button>
                    </div>

                    <div className="all_tags">
                        <TagsSlider handleTagId={handleTagId} setSelectedTags={setSelectedTags} selectedTags={selectedTags} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tags;
