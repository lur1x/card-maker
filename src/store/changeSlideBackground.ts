import { EditorType } from "./EditorType";
import { SolidBackground } from "./PresentationTypes";

export function changeSlideBackground(editor: EditorType, payload?: Object): EditorType {

    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }
    const updateSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                background: payload as SolidBackground,
            };
        }
        return SlideO;
    });
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updateSlides,
        }
    }
}