import { Slide } from "../../store/PresentationTypes";
import { SlideO } from "./Slide";
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
