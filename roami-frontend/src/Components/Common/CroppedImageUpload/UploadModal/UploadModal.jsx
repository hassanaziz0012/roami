import React, { useState } from 'react';


export default function UploadModal() {
    return (
        <section id="pin_modal">
            <div className="modal_container mx-auto">
                <div className="modal_contents">
                    {/* text contents */}

                    <div className="text_contents_wrapper">
                        <div className="text-content">
                            <div className="left">
                                <div className="location">
                                    <img src="/images/icon/location.svg" alt="" />
                                </div>
                                {/* md-show not show in mobile device */}
                                <p className="md-show">
                                </p>

                                <div className="star">
                                    <img src="/images/icon/star.png" alt="" />
                                </div>
                            </div>

                            <div className="right">
                                <div className="btn_group">
                                    <button className="follow">share  <img src="/images/icon/share.svg" alt="" /></button>
                                    <button className="get_list">
                                        <img src="/images/icon/location-color-sm.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}