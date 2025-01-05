import { SlideType } from "./PresentationTypes";
export function changeElementSize(slide: SlideType, elementId: string, newSize: {width: number, height: number}): SlideType {
    return {
        ...slide,
        elements: slide.elements.map(item =>
            item.id === elementId ? {
                ...item,
                size: newSize
            } : item
        ),
    };
}