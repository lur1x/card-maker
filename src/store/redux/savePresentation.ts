import { EditorType } from "../EditorType";
import { saveToLocalStorage, loadFromLocalStorage } from "../../store/localStorage/localStorageUtils";

export function savePresentation(editor: EditorType): EditorType {
    try {
        saveToLocalStorage(editor);
    } catch (err) {
        console.error('Error saving to localStorage:', err);
    }
    return editor; // Возвращаем editor (обычно после сохранения состояние не меняется)
}

export function loadPresentation(): EditorType {
    try {
        const loadedEditor = loadFromLocalStorage();
        if (loadedEditor) {
            return loadedEditor; // Возвращаем загруженное состояние
        } else {
            return {} as EditorType
        }
    } catch (err) {
        console.error('Error loading from localStorage:', err);
        return {} as EditorType; // В случае ошибки возвращаем пустое состояние или ваш editors
    }
}