import { SlideImage } from "../../store/PresentationTypes";
import { CSSProperties } from "react";

type SlideImageProps = {
    imageObject: SlideImage,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected}: SlideImageProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.pos.oy * scale}px`,
        left: `${imageObject.pos.ox * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
        zIndex: 3,
    }
    if (isSelected) {
        imageObjectStyles.border = '3px solid #0b57d0'
    }
    return (
        <img style={imageObjectStyles} src={`data:image/jpeg;base64, ${imageObject.src}`}/>
    )
}
export {
    ImageObject,
}