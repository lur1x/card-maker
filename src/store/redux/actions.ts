import { EditorType, SelectionType } from "../EditorType"

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
    SET_EDITOR = 'setEditor',
    ADD_TEXT = 'addText',
    ADD_IMAGE = 'addImage',
    DELETE_OBJEKT = 'deleteObject',
    CHANGE_SLIDE_BACKGROUND = 'changeSlideBackground',
    CHANGE_SLIDE_BACKGROUND_IMAGE = 'changeSlideBgrImage',
    MOVE_SLIDE = 'moveSlide',
    MOVE_ELEMENT = 'moveElement',
    RESIZE_ELEMENT = 'resizeElement',
    SAVE_PRESENTATION = 'savePresentation',
    LOAD_PRESENTATION = 'loadPresentation',
}

type MoveSlideAction = {
    type: ActionType.MOVE_SLIDE;
    payload: {
        editor: EditorType;
        slideId: string;
        targetSlideId: string;
    };
};

type MoveElementAction = {
    type: ActionType.MOVE_ELEMENT
    payload: {
        slideId: string;
        elementId: string;
        x: number;
        y: number;
    };
}

type ResizeElementAction = {
    type: ActionType.RESIZE_ELEMENT
    payload: {
        slideId: string;
        elementId: string;
        width: number;
        height: number;
        x: number;
        y: number;
    };
}
type AddSlideAction = {
    type: ActionType.ADD_SLIDE,
}
type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE,
}
type AddTextAction = {
    type: ActionType.ADD_TEXT,
}
type AddImageAction = {
    type: ActionType.ADD_IMAGE,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type SetSelectionAction = {
    type: ActionType.SET_SELECTION,
    payload: SelectionType,
}

type DeleteObjectAction = {
    type: ActionType.DELETE_OBJEKT
}
type ChangeSlideBgrAction = {
    type: ActionType.CHANGE_SLIDE_BACKGROUND
    payload: { type: 'solid'; color: string }
}
type ChangeSlideBgrImageAction = {
    type: ActionType.CHANGE_SLIDE_BACKGROUND_IMAGE
    payload: { type: 'image'; src: string }
}

type SavePresentationAction = {
    type: ActionType.SAVE_PRESENTATION;
    payload: EditorType;
};

type LoadPresentationAction = {
    type: ActionType.LOAD_PRESENTATION;
    payload: EditorType;
};
type EditorAction = AddSlideAction | RemoveSlideAction| AddTextAction | AddImageAction| SetSelectionAction | SetEditorAction
    | DeleteObjectAction | ChangeSlideBgrAction | ChangeSlideBgrImageAction | MoveSlideAction | MoveElementAction | ResizeElementAction
    | SavePresentationAction | LoadPresentationAction
export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}