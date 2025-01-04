import {EditorType} from "../EditorType.ts";
import { SetSelectionAction } from "./actions.ts";

function setSelection(editor: EditorType, action: SetSelectionAction): EditorType {
    return {
        ...editor,
        selection: action.payload,
    }
}
export {
    setSelection
}