import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx'
import './index.css'
import { addEditorChangeHandler} from "./store/editor";
import { Provider } from 'react-redux';
import { store } from './store/redux/store.ts';

const root = createRoot(document.getElementById('root')!)

function render()
{
    root.render(
        <Provider store={store}>
            <StrictMode>
                <App/>
            </StrictMode>
        </Provider>,
    )
}

addEditorChangeHandler(render)
render()