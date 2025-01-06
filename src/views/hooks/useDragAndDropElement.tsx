import { useState, useRef } from "react";
import { useAppActions } from './useAppActions';
import { useAppSelector } from './useAppSelector';

type UseDragAndDropElementProps = {
    slideId: string;
}

export function useDragAndDropElement({slideId}: UseDragAndDropElementProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
    const dragStartPos = useRef({x: 0, y: 0});


    const { changeElementPosition } = useAppActions();
    const editor = useAppSelector((state) => state);

    const elementRef = useRef<{ x: number; y: number } | null>(null);

    function handleElementMouseDown(event: React.MouseEvent<HTMLDivElement>, elementId: string): void {        event.preventDefault();
        event.preventDefault();
        setIsDragging(true);
        setDraggedElementId(elementId);
        dragStartPos.current = {x: event.clientX, y: event.clientY};

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        const element = slide?.elements.find((e) => e.id === elementId);
        if (element) {
            elementRef.current = { x: element.pos.ox, y: element.pos.oy };
        }
    }

    function handleElementMouseMove(event: React.MouseEvent): void {
        if (!isDragging || !draggedElementId) {
            return;
        }

        const deltaX = event.clientX - dragStartPos.current.x;
        const deltaY = event.clientY - dragStartPos.current.y;

        const slide = editor.presentation.slides.find((s) => s.id === slideId);
        if (!slide) return;

        const element = slide.elements.find((el) => el.id === draggedElementId);
        if (!element) return;

        const startX = elementRef.current ? elementRef.current.x : element.pos.ox;
        const startY = elementRef.current ? elementRef.current.y : element.pos.oy;

        const newX = Math.max(0, Math.min(startX + deltaX, 935 - element.size.width));
        const newY = Math.max(0, Math.min(startY + deltaY, 525 - element.size.height));

        changeElementPosition(slideId, draggedElementId, newX, newY);
    }

    function handleElementMouseUp(): void {
        setIsDragging(false);
        setDraggedElementId(null);
        elementRef.current = null;
    }


    return {
        isDragging,
        handleElementMouseDown,
        handleElementMouseMove,
        handleElementMouseUp,
    }
}