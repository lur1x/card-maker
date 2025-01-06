import {EditorType} from "../EditorType";
import {addSlide} from "../addSlide";
import {removeSlide} from "../removeSlide.ts";
import {addTextToSlide} from "../addTextToSlide.ts";
import {addImageToSlide} from "../addImageToSlide.ts";
import {defaultEditor} from "./defaultEditor";
import {setSelection} from "../setSelection.ts";
import {ActionType, EditorAction} from "./actions";
import {changeSlidePosition} from "../moveSlideOnList.ts";
import {changeElementPosition} from "../changeElementPosition.ts";
import {changeSlideBackground} from "../changeSlideBackground.ts";
import {changeSlideBgrImage} from "../changeSlideBgrImage.ts";
import {removeElementFromSlide} from "../removeElementFromSlide.ts";
import {resizeSlideElement} from "../resizeSlideElement.ts";
import {saveToLocalStorage} from "../localStorage/localStorageUtils.ts";
import {loadFromLocalStorage} from "../localStorage/localStorageUtils.ts";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
             return removeSlide(editor)
        case ActionType.ADD_TEXT:
            return addTextToSlide(editor)
        case ActionType.ADD_IMAGE:
            return addImageToSlide(editor )
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.DELETE_OBJEKT:
            return removeElementFromSlide(editor)
        case ActionType.CHANGE_SLIDE_BACKGROUND:
            return changeSlideBackground(editor, action.payload)
        case ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE:
            return changeSlideBgrImage(editor, action.payload)
        case ActionType.MOVE_SLIDE:
            return changeSlidePosition(action.payload.editor, action.payload.slideId, action.payload.targetSlideId)
        case ActionType.MOVE_ELEMENT:
            return changeElementPosition(
                editor,
                action.payload.slideId,
                action.payload.elementId,
                action.payload.x,
                action.payload.y
            );
        case ActionType.RESIZE_ELEMENT:
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