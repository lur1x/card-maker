import { validateEditor } from "./validation";
import { EditorType } from "../editorType.ts";
import { loadFromLocalStorage} from "./localStorageUtils.ts";

function exportPresentation() {
    try {
        const editor = loadFromLocalStorage();

        if (!editor) {
            throw new Error("Нет сохранённого состояния для экспорта.");
        }
        const dataStr = JSON.stringify(editor, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob)
        const linkElem = document.createElement('a');

        linkElem.href = url;
        linkElem.download = "presentation.json";
        linkElem.click();

        URL.revokeObjectURL(url);

        console.log("Экспортировано состояние из localStorage:", editor);
    }
    catch (error) {
        console.error("Ошибка при экспорте презентации:", error);
    }
}

function importPresentation(file: File): Promise<EditorType> {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsedContent = JSON.parse(content) as EditorType;

                if (!validateEditor(parsedContent)) {
                    throw new Error('Invalid presentation format');
                }

                resolve(parsedContent);
            }
            catch (err) {
                reject(err)
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsText(file);

    });
}

export {
    exportPresentation,
    importPresentation,
}