import { SlideType } from "./PresentationTypes";

export function changeTextColor(slide: SlideType, elementId: string, newFontColor: string): SlideType {
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