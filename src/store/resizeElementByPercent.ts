import { Slide } from "./PresentationTypes";

export function resizeElementByPercent(
    slide: Slide, elementId: string,
    newWidth: number, newHeight: number
): Slide {
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