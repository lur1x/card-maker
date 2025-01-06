
import styles from './ToolBar.module.css';
import { dispatch } from '../../store/editor';
import { removeElementFromSlide } from '../../store/removeElementFromSlide';
import { useAppActions } from '../hooks/useAppActions.ts';
import { exportPresentation } from '../../store/localStorage/fileUtils';
import { importPresentation } from '../../store/localStorage/fileUtils';
import { getEditor } from '../../store/editor';
import { useRef, useState} from 'react';

export function ToolBar()
{
   // function onAddSlide() {
     //   dispatch(addSlide);
    //}

    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // State for color picker

    const { addSlide } = useAppActions()
    const { removeSlide } = useAppActions()
    const { addTextToSlide } = useAppActions()
    const { addImageToSlide } = useAppActions()
    const { changeSlideBackground } = useAppActions()
    const { changeSlideBgrImage } = useAppActions()
    //function onRemoveSlide() {
      //  dispatch(removeSlide);
    //}

    //function onAddText() {
      //  dispatch(addTextToSlide);
    //}

    function onRemoveElement() {
        dispatch(removeElementFromSlide);
    }

    /*function onAddImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(addImageToSlide, imageUrl);
            };

            reader.readAsDataURL(file);
        }
    }*/

    //function onChangeSlideColor() {
      //  dispatch(changeSlideColor, {
        //    type: 'solid',
            //color: '#FF0000',
        //});
   // }

    const OnSlideBackgroundChange = (color: string) => {
        changeSlideBackground({ type: 'solid', color });
        setBackgroundColor(color); // Update color picker state
    };

    function onExportPresentachion() {
        const editor = getEditor();
        exportPresentation(editor);
    }

    function onImportPresentachion(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            importPresentation(file)
                .then((parsedContent) => {
                    dispatch(() => parsedContent);
                })
                .catch((err) => {
                    console.error('Error importing presentation:', err);
                    alert('Please check the file format.');
                });
        }
    }

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const bgrImageInputRef = useRef<HTMLInputElement | null>(null);
    /*function onChangeBgrImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                dispatch(changeSlideBgrImage, imageUrl);
            };

            reader.readAsDataURL(file);
        }
    }
    */
    const OnChangeSlideBgrImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                changeSlideBgrImage({ type: 'image', src: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className={styles.toolbar}>
            <button className={styles.button} onClick={addSlide}>
                Добавить Слайд
            </button>

            <button className={styles.button} onClick={removeSlide}>
                Удалить Слайд
            </button>

            <button className={styles.button} onClick={addTextToSlide}>
                Добавить текст
            </button>

            <button className={styles.button} >
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={addImageToSlide}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={imageInputRef}
                />
                <span onClick={() => imageInputRef.current?.click()}>Добавить картинку</span>
            </button>

            <button className={styles.button} onClick={onRemoveElement}>
                Удалить Объект
            </button>

            <div className={styles.changeSlideColor}>
                <button className={styles.button} >
                    Поменять Фон
                    <input
                        className={styles.colorpicker}
                        type={'color'}
                        value={backgroundColor}
                        onInput={() => {}}
                        onChange={(e) => OnSlideBackgroundChange(e.target.value)}                    ></input>
                </button>
            </div>

            <button className={styles.button} onClick={() => bgrImageInputRef.current?.click()}>
                <input
                    type="file"
                    id="imageUploader"
                    accept='image/*'
                    onChange={OnChangeSlideBgrImage}
                    className={styles.imageUploader}
                    style={{ display: 'none' }}
                    ref={bgrImageInputRef}
                />
                Фон слайда
            </button>

            <button className={styles.button} onClick={onExportPresentachion}>
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
                    onChange={onImportPresentachion}
                    className={styles.fileInput}
                    style={{ display: 'none' }}/>
            </div>
        </div>
    )
}