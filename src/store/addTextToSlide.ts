import { EditorType } from "./EditorType";
import { SlideText } from "./PresentationTypes";
import {uuidV4} from "./utils/uuidV4.ts";


export function addTextToSlide(editor: EditorType): EditorType {
    const newText = "Введите текст";
    if (!editor.selection || !editor.selection.selectedSlideId) {
        return editor;
    }
    const newTextObject: SlideText = {
        id: uuidV4(),
        pos: {ox: 300, oy: 400},
        size: {width: 200, height: 30},
        type: 'SlideText',
        value: newText,
        fontFamily: 'Arial',
        fontSize: 16,
        fontColor: '#000000',
    }
    const updatedSlides = editor.presentation.slides.map(SlideO => {
        if (SlideO.id === editor.selection.selectedSlideId) {
            return {
                ...SlideO,
                elements: [...SlideO.elements, newTextObject],
            };
        }
        return SlideO;
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides
        }
    };
}
