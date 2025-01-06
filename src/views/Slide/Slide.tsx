import { Slide } from "../../store/PresentationTypes";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { CSSProperties, MouseEvent  } from "react";
import { useDragAndDropElement } from "../hooks/useDragAndDropElement.tsx";
import { useResizeElement } from "../hooks/useResizeElements.tsx";
import { useAppSelector } from "../hooks/useAppSelector";
import { SelectionType } from "../../store/EditorType";
import { useAppActions } from "../hooks/useAppActions";

const Slide_Width = 935;
const Slide_Height = 525;

type SlideProps = {
    slide: Slide | null,
    scale?: number,
    className: string,
    selection?: SelectionType,
    showResizeHandles?: boolean;
}

export function SlideO({slide, scale = 1, className, showResizeHandles = true}: SlideProps) {
    const selection = useAppSelector((state) => state.selection);
    const {setSelection} = useAppActions();
    const {
        isDragging,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp
    } = useDragAndDropElement({slideId: slide?.id ?? ''});
    const {
        isResizing,
        handleResizeMouseDown,
        handleResizeMouseMove,
        handleResizeMouseUp
    } = useResizeElement({slideId: slide?.id ?? ''});

    if (slide == null) {
        return (<></>)
    }

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background?.type === 'solid' ? slide.background.color : 'transparent',
        backgroundImage: slide.background?.type === 'image' ? `url(${slide.background.src})` : 'none',
        backgroundSize: 'cover',
        position: 'relative',
        width: `${Slide_Width * scale}px`,
        height: `${Slide_Height * scale}px`,
        zIndex: 1,
    }

    const handleGlobalMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (isResizing) {
            handleResizeMouseMove(event);
        } else if (isDragging) {
            handleElementMouseMove(event);
        }
    };

    const handleGlobalMouseUp = () => {
        handleElementMouseUp();
        handleResizeMouseUp();
    };

    return (
        <div
            style={slideStyles}
            className={`${styles.slide} ${className}`}
            onMouseMove={handleGlobalMouseMove}
            onMouseUp={handleGlobalMouseUp}

        >
            {slide.elements.map(SlideElement => {
                const isSelectedElement = SlideElement.id === selection?.selectedObjectId;

                return (
                    <div

                        key={SlideElement.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelection({selectedSlideId: slide.id, selectedObjectId: SlideElement.id})
                        }}
                        onMouseDown={(event) => {
                            event.stopPropagation();
                            handleElementMouseDown(event, SlideElement.id)
                        }}

                    >
                        {SlideElement.type === "SlideText" && (
                            <TextObject
                                textObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectedElement}
                            />
                        )}
                        {SlideElement.type === "SlideImage" && (
                            <ImageObject
                                imageObject={SlideElement}
                                scale={scale}
                                isSelected={isSelectedElement}
                            />
                        )}
                        {isSelectedElement && showResizeHandles && (
                            <>
                                <div className={`${styles.resizeHandle} ${styles.topLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'top-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy,
                                         left: SlideElement.pos.ox
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.topRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'top-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy,
                                         left: SlideElement.pos.ox + SlideElement.size.width
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.bottomLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'bottom-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy + SlideElement.size.height,
                                         left: SlideElement.pos.ox
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.bottomRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'bottom-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy + SlideElement.size.height - 5,
                                         left: SlideElement.pos.ox + SlideElement.size.width - 5
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleLeft}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-left')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy + SlideElement.size.height / 2,
                                         left: SlideElement.pos.ox
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.middleRight}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'middle-right')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy + SlideElement.size.height / 2,
                                         left: SlideElement.pos.ox + SlideElement.size.width
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.topMiddle}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'top-middle')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy,
                                         left: SlideElement.pos.ox + SlideElement.size.width / 2
                                     }}/>
                                <div className={`${styles.resizeHandle} ${styles.bottomMiddle}`}
                                     onMouseDown={(event) => handleResizeMouseDown(event, SlideElement.id, 'bottom-middle')}
                                     style={{
                                         position: 'absolute',
                                         top: SlideElement.pos.oy + SlideElement.size.height,
                                         left: SlideElement.pos.ox + SlideElement.size.width / 2
                                     }}/>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}