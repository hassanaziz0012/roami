import React, { useState, useRef } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function CroppedImageUpload({ imgSrcState, cropState, blobRef }) {
    const [imgSrc, setImgSrc] = imgSrcState;
    const [crop, setCrop] = cropState;
    const imgRef = useRef(null);
    const hiddenAnchorRef = useRef(null);
    const blobUrlRef = useRef('')
    const [completedCrop, setCompletedCrop] = useState();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState(1 / 1);

    // function onSelectFile(e) {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setCrop(undefined) // Makes crop preview update between images.
    //         const reader = new FileReader()
    //         reader.addEventListener('load', () =>
    //             setImgSrc(reader.result?.toString() || ''),
    //         )
    //         reader.readAsDataURL(e.target.files[0])
    //     }
    // }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                blobRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    blobRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    return (
        <div className="App">
            <div className="Crop-Controls">
                {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <div style={{ display: "none" }}>
                        <canvas
                            ref={blobRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                        />
                    </div>
                    <div>
                        <a
                            ref={hiddenAnchorRef}
                            download
                            style={{
                                position: 'absolute',
                                top: '-200vh',
                                visibility: 'hidden',
                            }}
                        >
                            Hidden download
                        </a>
                    </div>
                </>
            )}
        </div>
    )
}