import { Slide } from "./PresentationTypes";
export function changeElementPosition(slide: Slide, elementId: string, newPosition: {ox: number, oy: number}): Slide {
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