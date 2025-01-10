import styles from './TopPanel.module.css';
import React from "react";
import { useAppSelector } from '../hooks/useAppSelector';
import { dispatch } from '../../store/editor';
import { renamePresentationTitle } from '../../store/renamePresentationTitle.ts';

function TopPanel() {
    const title = useAppSelector((editor) => editor.presentation.title);
    const [inputValue, setInputValue] = React.useState(title);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        dispatch(renamePresentationTitle, newValue);// Вызовите dispatch с новым заголовком
    };

    React.useEffect(() => {
        // Обновляем ширину текстового поля, основываясь на содержимом
        if (inputRef.current) {
            const tempSpan = document.createElement("span");
            tempSpan.style.visibility = "hidden";
            tempSpan.style.whiteSpace = "pre"; // Учитываем пробелы
            tempSpan.innerText = inputValue || " "; // Добавляем пробел для минимальной ширины
            document.body.appendChild(tempSpan);
            const width = tempSpan.offsetWidth; // Получаем ширину текста
            document.body.removeChild(tempSpan);
            if (inputRef.current) {
                inputRef.current.style.width = `${width + 7}px`; // Устанавливаем ширину инпута
            }
        }
    }, [inputValue]);

    // Обновите значение inputValue при изменении заголовка
    React.useEffect(() => {
        setInputValue(title);
    }, [title]);

    return (
        <div className={styles.TopPanel}>
            <input
                ref={inputRef}
                className={styles.title}
                type="text"
                value={inputValue} // Изменяем `defaultValue` на `value`
                onChange={onTitleChange}
                style={{ transition: "width 0.2s ease" }} // Плавное изменение ширины
                maxLength={45}
            />
        </div>
    );
}

export {
    TopPanel
};
