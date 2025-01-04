import { EditorType } from "./EditorType";
import { Slide } from "./PresentationTypes";

export function addSlide(editor: EditorType): EditorType {
    const newSlide: Slide = {
        id: generateRandomId(6),
        elements: [],
        background: {type: 'solid', color: '#FFFFFF'}
    }
    const selectedSlideindex = editor.presentation.slides.findIndex(SlideO => SlideO.id == editor.selection.selectedSlideId);
    return {

        presentation: {
            ...editor.presentation,
            slides: [
                ...editor.presentation.slides.slice(0, selectedSlideindex + 1),
                newSlide,
                ...editor.presentation.slides.slice(selectedSlideindex + 1)
            ]
        },
        selection: editor.selection
    };
}
function generateRandomId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++)
    {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex]
    }
    return result;
}