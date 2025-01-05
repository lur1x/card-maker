import { SlideType } from "./PresentationTypes";
export function changeElementPosition(slide: SlideType, elementId: string, newPosition: {ox: number, oy: number}): SlideType {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId ? {
                ...item,
                pos: newPosition
            } : item
        ),
    };
}