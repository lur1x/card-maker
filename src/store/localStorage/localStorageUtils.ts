import { EditorType } from "../EditorType";
import { validateEditor } from "./validation";

export const saveToLocalStorage = (editor: EditorType) => {
    try {
        if(!validateEditor(editor)) {
            console.error('Validate Error', validateEditor.errors)
            throw new Error('Invalid data save')
        }
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
    } catch (err) {
        console.error('Error saving to LS:', err);
    }
};

export const loadFromLocalStorage = (): EditorType | null => {
    try {
        const serializedState = localStorage.getItem('presentationEditor');

        if (!serializedState) {
            console.error('No data');
            return null;
        }

        const editState = JSON.parse(serializedState) as EditorType;
        if (!validateEditor(editState)) {
            console.error('Invalid data loading');
            throw new Error('Invallid save data');
        }
        return editState;
    } catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }
}