import { EditorType } from "./EditorType";
import { SlideElement } from "./PresentationTypes";

export function resizeSlideElement(
    currentEditor: EditorType,
    slideId: string,
    elementId: string,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
): EditorType {
    const slide = currentEditor.presentation.slides.find(s => s.id === slideId);
    if (!slide) return currentEditor;
    const element = slide.elements.find(el => el.id === elementId);
    if (!element) return currentEditor;

    const updatedElem: SlideElement = {
        ...element,
        pos: { ox: newX, oy: newY },
        size: { width: newWidth, height: newHeight }
    }

    const updatedElems = slide.elements.map(el => el.id === elementId ? updatedElem : el);
    const updatedSlide = { ...slide, elements: updatedElems };

    return {
        ...currentEditor,
        presentation: {
            ...currentEditor.presentation,
            slides: currentEditor.presentation.slides.map(s => s.id === slideId ? updatedSlide : s)
        }
    };
}