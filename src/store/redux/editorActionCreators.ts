import { EditorType } from "../editorType.ts";
import { ActionType } from "./actions";
import { store } from "./store";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function getEditor() {
    return store.getState();
}

export {
    setEditor,
    getEditor,
}