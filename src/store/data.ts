import {Presentation, Slide} from "./PresentationTypes.ts";
import {EditorType} from "./EditorType.ts";
import {img1} from "./img1.ts";
import {imgBgr} from "./background.ts";

const slide1: Slide = {
    id: 'slide-1',
    elements: [
        {
            id: 'text-1',
            type: 'SlideText',
            pos: {ox: 20, oy: 170},
            size: {width: 400, height: 30},
            value: 'Подвыпившие Штирлиц и Мюллер вышли из бара.\n' +
                '— Давайте снимем девочек, — предложил Штирлиц.\n' +
                '— У вас очень доброе сердце, — ответил Мюллер. — Но пусть все-таки повисят до утра.',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'text-2',
            type: 'SlideText',
            pos: {ox: 100, oy: 10},
            size: {width: 400, height: 30},
            value: 'КоГда УжЕ хУки?',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'text-3',
            type: 'SlideText',
            pos: {ox: 100, oy: 50},
            size: {width: 400, height: 30},
            value: 'НЕееет хуки',
            fontFamily: 'Arial',
            fontSize: 20,
            fontColor: '00CC99'
        },
        {
            id: 'image-1',
            type: 'SlideImage',
            pos: {ox: 350, oy: 300},
            size: {width: 200, height: 130},
            src: img1,
        },

    ],
    background: {type: 'solid', color: '#007799'},
}
const slide2: Slide = {
    id: 'slide-2',
    elements: [
        {
            id: 'image-2',
            type: 'SlideImage',
            pos: {ox: 420, oy: 50},
            size: {width: 400, height: 200},
            src: img1,
        },
    ],
    background: {type: 'image', src: imgBgr},

}

const presentation: Presentation = {
    title: 'Презентация без регистрации и смс',
    slides: [
        slide1, slide2
    ]
}

const editor: EditorType = {
    presentation,
    selection: {
        selectedSlideId: null,
        selectedObjectId: null,
    }
}

export {
    editor,
}