import { EditorType } from "../EditorType";
import { addSlide } from "../addSlide";
import { removeSlide } from "../removeSlide.ts";
import { defaultEditor } from "./defaultEditor";
import { setSelection } from "./setSelection.ts";
import { ActionType, EditorAction } from "./actions";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
             return removeSlide(editor)
        case ActionType.SET_SELECTION:
            return setSelection(editor, action)
        default:
            return editor
    }
}
export {
    editorReducer,
}