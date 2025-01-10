import {EditorType} from "../editorType.ts";
import {addSlide} from "../addSlide";
import {removeSlide} from "../removeSlide.ts";
import {addTextToSlide} from "../addTextToSlide.ts";
import {addImageToSlide} from "../addImageToSlide.ts";
import {removeSlideElement} from "../removeSlideElement.ts";
import {defaultEditor} from "./defaultEditor";
//import {editor as defaultEditor} from "../data.ts";
import {setSelection} from "../setSelection.ts";
import {ActionType, EditorAction} from "./actions";
import {changeSlidePosition} from "../changeSlidePosition.ts";
import {changeElementPosition} from "../changeElementPosition.ts";
import {changeSlideBackground} from "../changeSlideBackground.ts";
import {changeSlideBgrImage} from "../changeSlideBgrImage.ts";
import {resizeSlideElement} from "../resizeSlideElement.ts";
import {saveToLocalStorage, loadFromLocalStorage} from "../localStorage/localStorageUtils.ts";



function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
             return removeSlide(editor)
        case ActionType.ADD_TEXT:
            return addTextToSlide(editor)
        case ActionType.ADD_IMAGE:
            return addImageToSlide(editor, action.payload.src, action.payload.width, action.payload.height);
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.REMOVE_SLIDE_ELEMENT:
            return removeSlideElement(editor)
        case ActionType.CHANGE_SLIDE_BACKGROUND:
            return changeSlideBackground(editor, action.payload)
        case ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE:
            return changeSlideBgrImage(editor, action.payload)
        case ActionType.CHANGE_SLIDE_POSITION:
            return changeSlidePosition(action.payload.editor, action.payload.slideId, action.payload.targetSlideId)
        case ActionType.CHANGE_ELEMENT_POSITION:
            return changeElementPosition(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.x,
                action.payload.y
            );
        case ActionType.RESIZE_SLIDE_ELEMENT:
            return resizeSlideElement(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.width,
                action.payload.height,
                action.payload.x,
                action.payload.y
            );
        case ActionType.SAVE_PRESENTATION:
            saveToLocalStorage(action.payload);
            return action.payload;
        case ActionType.LOAD_PRESENTATION:
            return loadFromLocalStorage() ?? defaultEditor;
        default:
            return editor
    }
}

export {
    editorReducer,
}