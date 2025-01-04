import { Slide } from "../../store/PresentationTypes.ts";
import { SlideO } from "../Slide/Slide.tsx";
import styles from './WorkSpace.module.css'

type WorkspaceProps = {
    slide: Slide | null,
    selectedObjectId: string | null
}
function Workspace({slide, selectedObjectId}: WorkspaceProps) {
    return (
        <div className={styles.workspace}>
            <SlideO slide={slide} isSelected={false} className={styles.workspace} selectedObjectId={selectedObjectId}></SlideO>
        </div>
    )
}
export {
    Workspace,
}
