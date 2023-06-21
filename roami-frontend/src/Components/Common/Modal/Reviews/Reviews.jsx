import React, { useState } from "react";
import "./Reviews.scss";
import ReviewSlider from "./ReviewSlider/ReviewSlider";

const Reviews = () => {
  const [isShowReviews, setIsShowReviews] = useState(false);

  
  return (
    <div id="reviews">
       <div className="top">
          <h3>14 Reviews</h3>
          <button onClick={()=>setIsShowReviews(!isShowReviews)} className="show-reviews_btn">
            <img className={`${isShowReviews ? "arrow_rotate":""}`}  src="/images/icon/bottom-arrow.png" alt="" />
          </button>
        </div>
      {isShowReviews &&  (
        <div className="bottom">
          <h2>
            Reviews 
          </h2>

          {/* slider */}
          <ReviewSlider />
        </div>
      )}
    </div>
  );
};

export default Reviews;
