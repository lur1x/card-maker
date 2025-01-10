import { legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { editor } from "../data.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage/localStorageUtils.ts";

const store = createStore(editorReducer, loadFromLocalStorage() ?? editor);

store.subscribe(() => {saveToLocalStorage(store.getState())});

export {
    store
}