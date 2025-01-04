import { Slide } from "./PresentationTypes";

export function resizeElementByPixs(
    slide: Slide, elementId: string,
    newSize: number
): Slide {
    return {
        ...slide,
        elements: slide.elements.map((txt) => {
            if (txt.id === elementId) {
                return {
                    ...txt,
                    fontSize: newSize
                }
            }
            return txt;
        })
    }
}