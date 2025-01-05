import { Slide } from "../Slide/Slide.tsx";
import styles from './SlideList.module.css';
//import { SelectionType } from "../../store/EditorType.ts";
//import { setSelection } from "../../store/redux/setSelection.ts";
import { useSlideTransition } from "../hooks/useSlideTransition.ts";
import { useAppActions } from "../hooks/useAppActions.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";

const Slide_Preview_Scale = 0.2;

function getSlideWrapperClassName(slideId: string, selectedSlideId: string | undefined): string {
    let className = styles.slideWrapper;
    if (slideId === selectedSlideId) {
        className = `${className} ${styles.selectedSlide}`;
    }
    return className;
}

export function SlidesList() {
    const editor = useAppSelector(editor => editor);
    const slides = editor.presentation.slides;
    const selection = editor.selection;

    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useSlideTransition();

    const { setSelection } = useAppActions();

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            selectedObjectId: '',
        });
    }

    return (
        <div className={styles.slideList}>
            {slides.map(slide => (
                <div
                    key={slide.id}
                    draggable
                    onDragStart={() => handleDragStart(slide.id)}
                    onDragOver={(e) => handleDragOver(e, slide.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onSlideClick(slide.id)}
                    className={`${getSlideWrapperClassName(slide.id, selection?.selectedSlideId)} ${draggingSlide === slide.id ? 'dragging' : (dragOverSlide === slide.id ? 'dragover' : '')}`}
                >
                    <Slide
                        slide={slide}
                        scale={Slide_Preview_Scale}
                        isSelected={selection ? slide.id === selection.selectedSlideId : false}
                        className={styles.item}
                        selectedObjectId={selection?.selectedObjectId || null}
                        showResizeHandles={false}
                    />
                </div>
            ))}
        </div>
    );
}
/*import { SlidesCollection } from "../../store/PresentationTypes";
import { Slide } from "./../Slide/Slide";
import styles from './SlideList.module.css'
import { SelectionType } from "../../store/EditorType";
import { dispatch } from "../../store/editor";
import { setSelection } from "../../store/redux/setSelection";
import { useSlideTransition } from "../hooks/useSlideTransition";

const Slide_Preview_Scale = 0.2

type SlideListProps = {
    slides: SlidesCollection,
    selection: SelectionType,
}

export function SlidesList({slides, selection}: SlideListProps)
{
    const {
        draggingSlide,
        dragOverSlide,
        handleDragStart,
        handleDragOver,
        handleDragEnd
    } = useSlideTransition();

    function onSlideClick(slideId: string)
    {
        dispatch(setSelection, {selectedSlideId: slideId})
    }

    return (
        <div className={styles.slideList}>
            {slides.map(slide =>
                <div key={slide.id}
                     draggable
                     onDragStart={() => handleDragStart(slide.id)}
                     onDragOver={(e) => handleDragOver(e, slide.id)}
                     onDragEnd={handleDragEnd}
                     onClick={() => onSlideClick(slide.id)}
                     className={draggingSlide === slide.id ? 'dragging' : (dragOverSlide === slide.id ? 'dragover' : '')}>
                    <Slide
                        slide={slide}
                        scale={Slide_Preview_Scale}
                        isSelected={selection ? slide.id === selection.selectedSlideId : false}
                        className={styles.item}
                        selectedObjectId={selection?.selectedObjectId}
                        showResizeHandles={false}
                    ></Slide>
                </div>
            )}
        </div>
    )
}*/
