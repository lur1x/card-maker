import { SlidesCollection } from "../../store/PresentationTypes.ts";
import { SlideO } from "../Slide/Slide.tsx";
import styles from './SlideList.module.css'
import { SelectionType } from "../../store/EditorType.ts";
//import { dispatch } from "../../store/editor";
//import { setSelection } from "../../store/redux/setSelection.ts";
import { useSlideTransition } from "../hooks/useSlideTransition.ts";
import { useAppActions } from "../hooks/useAppActions.ts";

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

    const {setSelection} = useAppActions()

    function onSlideClick(slideId: string) {
        setSelection({
            selectedSlideId: slideId,
            selectedObjectId: '',
        })
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
                    <SlideO
                        slide={slide}
                        scale={Slide_Preview_Scale}
                        isSelected={selection ? slide.id === selection.selectedSlideId : false}
                        className={styles.item}
                        selectedObjectId={selection?.selectedObjectId}
                        showResizeHandles={false}
                    ></SlideO>
                </div>
            )}
        </div>
    )
}