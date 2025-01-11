import { EditorType } from "../editorType.ts";
import { validateEditor } from "./validation";

function saveToLocalStorage(editor: EditorType) {

    try {
        if(!validateEditor(editor)) {
            console.error('Validate Error', validateEditor.errors)
            throw new Error('Invalid data save')
        }
        const serializedState = JSON.stringify(editor);
        localStorage.setItem('presentationEditor', serializedState);
        console.log("Состояние редактора успешно сохранено в localStorage.");
    }
    catch (err) {
        console.error('Error saving to LS:', err);
    }

};

function loadFromLocalStorage(): EditorType | null {

    try {
        const serializedState = localStorage.getItem('presentationEditor');

        if (serializedState === null) {
            console.warn("Нет данных в localStorage.");
            return null;
        }


        const editor = JSON.parse(serializedState) as EditorType;

        if (!validateEditor(editor)) {
            console.error("Ошибка валидации при загрузке из localStorage:", validateEditor.errors);
            throw new Error("Данные из localStorage не прошли валидацию.");
        }

        console.log("Состояние редактора успешно загружено из localStorage.");
        return editor;

    }
    catch (err) {
        console.error('Error loading from LS:', err);
        return null;
    }

}

export {
    saveToLocalStorage,
    loadFromLocalStorage,
}