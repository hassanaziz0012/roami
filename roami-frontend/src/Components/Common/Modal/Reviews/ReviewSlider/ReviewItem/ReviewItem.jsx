import React from "react";
import "./ReviewItem.scss";

const ReviewItem = () => {
  return (
    <div id="review_item">
      <div className="review_top">
        <div className="l-1">
        <h4>Mary Poppins</h4>
        <span>
          <img src="/images/icon/star.png" alt="" />
          4,9
        </span>
        </div>
        <div className="l-2">
        <h5> roami guide <span>| 22 Reviews</span></h5>
        </div>
        
      </div>

      <p>
        krassester Night Sky auf jeden fall, ist nur zu empfehlen und würde
        definitiv einen Tag mehr für den einen Spot einplanen. Hab noch einen
        Aussichtspunkt entdeckt den ich hier noch vorschlagen würde:
        https://goo.gl/maps/uYzbJd8FZ1y24hCP6 @Magnelia Beltram hast du den auch
        gesehen?
      </p>
    </div>
  );
};

export default ReviewItem;
