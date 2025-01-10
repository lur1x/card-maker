import { EditorType } from "../editorType.ts";
import { validateEditor } from "./validation";

export const saveToLocalStorage = (editor: EditorType) => {

    try {
        if(!validateEditor(editor)) {
            console.error('Validate Error', validateEditor.errors)
            throw new Error('Invalid data save')
        }
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
    }
    catch (err) {
        console.error('Error saving to LS:', err);
    }

};

export const loadFromLocalStorage = (): EditorType | null => {

    try {
        const serializedState = localStorage.getItem('presentationEditor');

        if (serializedState === null) {
            return null;
        }

        return JSON.parse(serializedState)

    }
    catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }

}