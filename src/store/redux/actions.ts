import { EditorType, SelectionType } from "../EditorType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    DELETE_OBJECT = 'deleteObject',
    MOVE_SLIDE = 'moveSlide',
}
type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}
type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}
type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type DeleteObjectAction = {
    type: ActionType.DELETE_OBJECT
}

type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE;
    payload: {
        editor: EditorType;
        slideId: string;
        targetSlideId: string;
    };
};

type EditorAction = AddSlideAction | RemoveSlideAction | SetSelectionAction | SetEditorAction | DeleteObjectAction | MoveSlideAction
export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}