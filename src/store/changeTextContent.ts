import { SlideType } from "./PresentationTypes";

export function changeTextContent(slide: SlideType, elementId: string, newText: string): SlideType {
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