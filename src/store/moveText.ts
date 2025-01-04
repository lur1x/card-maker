import { Slide } from "./PresentationTypes";

export function moveText(
    slide: Slide, elementId: string,
    newX: number, newY: number
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((txt) => {
            if (txt.id === elementId) {
                return { ...txt, x: newX, y: newY }
            }
            return txt;
        })
    }
}