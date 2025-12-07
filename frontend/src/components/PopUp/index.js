import style from './PopUp.module.css';
import { useState, useEffect } from "react";

function Popup({ titulo, mensagem }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
         }, 2500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isVisible && (
                <div className={style.PopUp}>
                    <h1>{titulo}</h1>
                    <p>{mensagem}</p>
                </div>
            )}
        </>
    );
}

export default Popup;