import { EditorType } from "./EditorType";

export function moveSlideElement(
    editor: EditorType, slideId: string, elementId: string,
    newX: number, newY: number
): EditorType {
    return {

        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide =>
                slide.id === slideId ? {
                    ...slide,
                    elements: slide.elements.map(element =>
                        element.id === elementId ? {
                            ...element, pos: {ox: newX, oy: newY}
                        } : element
                    )
                } : slide
            )
        },
    };
}