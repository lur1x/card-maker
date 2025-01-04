import { uuidV4 } from "../utils/uuidV4";
import { Slide  } from "./../PresentationTypes";

function createNewSlide(): Slide {
    return {
        id: uuidV4(),
        elements: [],
        background: {
            type: 'solid',
            color: '#ffffff',  // Здесь используется SolidBackground
        }
    };
}
export {
    createNewSlide,
}