import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({src}) => {
    return (
        <LazyLoadImage
            alt={src}
            effect="blur"
            src={src}
        />
    );
};

export default Img;