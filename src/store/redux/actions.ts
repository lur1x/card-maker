import { SelectionType } from "../EditorType"
enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    SET_SELECTION = 'setSelection',
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
type EditorAction = AddSlideAction | RemoveSlideAction| SetSelectionAction
export {
    ActionType,
    type SetSelectionAction,
    type EditorAction,
}