import { Slide } from "./PresentationTypes";

export function changeTextColor(slide: Slide, elementId: string, newFontColor: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                fontColor: newFontColor
            } : item
        ),
    };
}