import styles from './App.module.css'
import { SlidesList } from './views/SlideList/SlideList.tsx'
import { TopPanel } from './views/TopPanel/TopPanel'
import { Workspace } from './views/WorkSpace/WorkSpace.tsx'
//import { useAppSelector } from './views/hooks/useAppSelector.ts';
import { HistoryType } from './store/utils/history.ts';
import { HistoryContext } from './views/hooks/historyContenx.ts';
//import { Slide } from './store/PresentationTypes.ts';
import { ToolBar } from "./views/ToolBar/ToolBar.tsx";

type AppProps = {
    history: HistoryType,
}
/*function App({history}: AppProps) {
    return ( {
    const editor = useAppSelector(state => state)

    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]

    return (
        <>
            <TopPanel title={editor.presentation.title}></TopPanel>
            <ToolBar></ToolBar>
            <div className={styles.container}>
                <SlidesList slides={slides} selection={selection}></SlidesList>
                <Workspace slide={selectedSlide} selectedObjectId={selection?.selectedObjectId || null}></Workspace>
            </div>
        </>
    )
}
*/

function App({history}: AppProps) {
    return (
        <HistoryContext.Provider value={history}>
            <TopPanel></TopPanel>
            <ToolBar></ToolBar>
            <div className={styles.container}>
                <SlidesList></SlidesList>
                <Workspace></Workspace>
            </div>
        </HistoryContext.Provider>
    )
}
export default App