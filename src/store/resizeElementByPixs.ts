import { SlideType } from "./PresentationTypes";

export function resizeElementByPixs(
    slide: SlideType, elementId: string,
    newSize: number
): SlideType {
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