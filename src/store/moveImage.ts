import { Slide } from "./PresentationTypes";

export function moveImage(
    slide: Slide, elementId: string,
    newX: number, newY: number
): Slide {
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