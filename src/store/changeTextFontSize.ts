import { Slide } from "./PresentationTypes";

export function changeTextFontSize(slide: Slide, elementId: string, newSize: {width: number, height: number}): Slide {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                size: newSize
            } : item
        ),
    };
}