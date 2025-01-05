import { Presentation, SlideType } from "./PresentationTypes";

export function changeSlidePosition(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    function findSlideIndex(slides: SlideType[], slideId: string): number {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].id === slideId) {
                return i;
            }
        }
        return -1; // возвращ -1, если слайд не найден
    }

    const currentIndex = findSlideIndex(presentation.slides, slideId);
    if (currentIndex === -1 || newIndex < 0 || newIndex >= presentation.slides.length) {
        throw new Error("Неверный индекс или слайд не найден");
    }
    const updatedSlides = [...presentation.slides];
    const [movedSlide] = updatedSlides.splice(currentIndex, 1);
    updatedSlides.splice(newIndex, 0, movedSlide);
    console.log(currentIndex);
    return {
        ...presentation,
        slides: updatedSlides,
    };
}