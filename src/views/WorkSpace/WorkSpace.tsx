import { Slide } from "../../store/PresentationTypes.ts";
import { SlideO } from "../Slide/Slide.tsx";
import styles from './WorkSpace.module.css'
import { useAppSelector } from "../hooks/useAppSelector.ts";

 type WorkspaceProps = {
   slide: Slide | null,
   selectedObjectId: string | null
}
function Workspace() {

    const editor = useAppSelector((editor=> editor))
    const slides = editor.presentation.slides
    const selection = editor.selection
    const selectedSlide: Slide = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0]
    const selectedObj: string = editor.selection?.selectedObjectId || "";

    return (
        <div className={styles.workspace}>
            <SlideO slide={selectedSlide}  className={styles.workspace} selectedObjectId={selectedObj}></SlideO>
        </div>
    )
}
export {
    Workspace,
}
