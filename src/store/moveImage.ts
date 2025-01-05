import { SlideType } from "./PresentationTypes";

export function moveImage(
    slide: SlideType, elementId: string,
    newX: number, newY: number
): SlideType {
    return {
        ...slide,
        elements: slide.elements.map((img) => {
            if (img.id === elementId) {
                return { ...img, x: newX, y: newY }
            }
            return img;
        })
    }
}