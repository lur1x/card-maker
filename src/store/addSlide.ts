import { EditorType } from "./editorType.ts";
import { SlideType } from "./PresentationTypes";
import {uuidV4} from "./utils/uuidV4.ts";

/*import { createNewSlide } from "./redux/createNewSlide";

function addSlide(editor: EditorType): EditorType {

    const selection = editor.selection
    const newSlide = createNewSlide()
    const slides: SlideType[] = []
    if (selection) {
        for (const slide of editor.presentation.slides) {
            slides.push(slide)
            if (slide.id === selection.selectedSlideId) {
                slides.push(newSlide)
            }
        }
    }
    else {
        slides.push(newSlide)
    }
    return {
        presentation: {
            ...editor.presentation,
            slides: slides,
        },
        selection: {
            selectedSlideId: newSlide.id,
            selectedObjectId: null,
        }
    }
}*/

function addSlide(NewPresentation: EditorType): EditorType {
    const newSlide: SlideType = {
        id: uuidV4(),
        elements: [],
        background: {
            type: 'solid',
            color: '#FFFFFF',
        },
    }
    const selectedSlideindex = NewPresentation.presentation.slides.findIndex(SlideO => SlideO.id == NewPresentation.selection?.selectedSlideId);
    return{
        presentation:{
            ...NewPresentation.presentation,
            slides: [...NewPresentation.presentation.slides.slice(0, selectedSlideindex + 1),
                newSlide,
                ...NewPresentation.presentation.slides.slice(selectedSlideindex + 1)]
        },
        selection: NewPresentation.selection

    }
}

export {
    addSlide,
}