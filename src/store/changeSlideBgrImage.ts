import { EditorType } from "./EditorType";
import { ImageBackground } from "./PresentationTypes";
import {imgBgr} from "./background.ts";

export function changeSlideBgrImage(editor: EditorType): EditorType {
    const newBackground: ImageBackground = {
        type: 'image',
        src: imgBgr,
    };
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }
    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                background: newBackground,
            };
        }
        return SlideO;
    });
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        }
    };
}