import { Slide } from "./PresentationTypes";

export function changeTextContent(slide: Slide, elementId: string, newText: string): Slide {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId && item.type === "SlideText" ? {
                ...item,
                value: newText
            } : item
        ),
    };
}