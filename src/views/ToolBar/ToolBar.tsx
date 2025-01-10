import styles from './ToolBar.module.css';
import { useAppActions } from '../hooks/useAppActions.ts';
import { importPresentation, exportPresentation } from '../../store/localStorage/fileUtils';
import { getEditor } from '../../store/editor';
import React, { useRef, useState, useEffect} from 'react';
import { HistoryContext } from '../hooks/historyContenx.ts';

export function ToolBar() {

    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // State for color picker

    const { addSlide } = useAppActions()
    const { removeSlide } = useAppActions()
    const { addTextToSlide } = useAppActions()
    const { addImageToSlide } = useAppActions()
    const { removeSlideElement } = useAppActions()
    const { changeSlideBackground } = useAppActions()
    const { changeSlideBgrImage } = useAppActions()
    const { setEditor } = useAppActions()
    const history = React.useContext(HistoryContext)

    function onUndo() {
        const newEditor = history.undo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    function onRedo() {
        const newEditor = history.redo()
        if (newEditor) {
            setEditor(newEditor)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey) {
                if (event.key === 'z') {
                    event.preventDefault();
                    onUndo();
                } else if (event.key === 'y') {
                    event.preventDefault();
                    onRedo();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleImageChange =(event: React.ChangeEvent<HTMLInputElement>)=> {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgSrc = reader.result as string;
                // Создаем новый объект Image для получения размеров
                const img = new Image();
                img.src = imgSrc;
                img.onload = () => {
                    // Теперь мы можем получить размеры
                    const width = img.width;
                    const height = img.height;

                    // Добавляем изображение с оригинальными размерами
                    addImageToSlide(imgSrc, width, height);
                };
            }
            reader.readAsDataURL(file);
        }

    }

    const OnChangeSlideBgrImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                changeSlideBgrImage({ type: 'image', src: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const OnSlideBackgroundChange = (color: string) => {
        changeSlideBackground({ type: 'solid', color });
        setBackgroundColor(color); // Update color picker state
    };

    function onExportPresentation() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    function onImportPresentation(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            importPresentation(file)
                .catch((err) => {
                    console.error('Error importing presentation:', err);
                    alert('Error importing presentation. Please check the file format.');
                });
        }
    }

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const bgrImageInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                Добавить Слайд
            </button>

            <button className={styles.button} onClick={removeSlide}>
                Удалить Слайд
            </button>

            <button className={styles.button} onClick={onUndo}>
                Undo
            </button>

            <button className={styles.button} onClick={onRedo}>
                Redo
            </button>

            <button className={styles.button} onClick={addTextToSlide}>
                Добавить текст
            </button>

            <button className={styles.button}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={handleImageChange}
                    className={styles.imageUploader}
                    style={{display: 'none'}}
                    ref={imageInputRef}
                />
                <span onClick={() => imageInputRef.current?.click()}>Добавить картинку</span>
            </button>

            <button className={styles.button} onClick={removeSlideElement}>
                Удалить Объект
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button}>
                    Поменять Фон
                    <input
                        className={styles.colorpicker}
                        type={'color'}
                        value={backgroundColor}
                        onInput={() => {
                        }}
                        onChange={(e) => OnSlideBackgroundChange(e.target.value)}></input>
                </button>
            </div>

            <button className={styles.button} onClick={() => bgrImageInputRef.current?.click()}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={OnChangeSlideBgrImage}
                    className={styles.imageUploader}
                    style={{display: 'none'}}
                    ref={bgrImageInputRef}
                />
                Фон слайда
            </button>

            <button className={styles.button} onClick={onExportPresentation}>
                Экспорт
            </button>

            <div className={styles.importButton}>

                <button
                    className={styles.button}
                    onClick={() => document.getElementById('importFile')?.click()}>
                    Импорт
                </button>

                <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={onImportPresentation}
                    className={styles.fileInput}
                    style={{display: 'none'}}/>
            </div>
        </div>
    )
}