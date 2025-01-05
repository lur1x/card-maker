import { SlideType } from "./PresentationTypes";

export function resizeElementByPercent(
    slide: SlideType, elementId: string,
    newWidth: number, newHeight: number
): SlideType {
    return {
        ...slide,
        elements: slide.elements.map((img) => {
            if (img.id === elementId) {
                return { ...img, width: newWidth, height: newHeight }
            }
            return img;
        })
    }
}