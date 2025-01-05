import { SlideType } from "../../store/PresentationTypes.ts"; // Исправленный импорт
import { Slide } from "../Slide/Slide.tsx";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import styles from './WorkSpace.module.css';

function Workspace() {
    const editor = useAppSelector((editor) => editor);
    const slides = editor.presentation.slides;
    const selection = editor.selection;
    const selectedSlide: SlideType = slides.find(slide => slide.id === selection?.selectedSlideId) || slides[0];

    return (
        <div className={styles.workspace}>
            <Slide slide={selectedSlide} selectedObjectId={selection?.selectedObjectId || null} className=""/>
        </div>
    );
}
export {
    Workspace,
}
