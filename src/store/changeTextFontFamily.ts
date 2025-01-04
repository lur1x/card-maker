import { Slide } from "./PresentationTypes";

export function changeTextFontFamily(slide: Slide, elementId: string, newFontFamily: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                fontFamily: newFontFamily
            } : item
        ),
    };
}