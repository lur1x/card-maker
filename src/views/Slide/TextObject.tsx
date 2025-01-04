import { SlideText } from "../../store/PresentationTypes";
import { CSSProperties} from "react";

type TextObjectProps = {
    textObject: SlideText,
    scale?: number,
    isSelected: boolean,
}

function TextObject({textObject, scale = 1, isSelected}: TextObjectProps)
{

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.pos.oy * scale}px`,
        left: `${textObject.pos.ox * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.fontSize * scale}px`,
        zIndex: 3,
        margin: 0,
    }

    if (isSelected) {
        textObjectStyles.border = '3px solid #0b57d0',
            textObjectStyles.borderColor = '#0b57d0'
    }

    return (
        <p style={textObjectStyles}>{textObject.value}</p>
    )
}

export {
    TextObject,
}