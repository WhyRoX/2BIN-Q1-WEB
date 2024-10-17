import { useState } from "react";
import "./ClickCounter.css";

interface ClickCounterProps {
    title: string;
    on10ClickMessage?: string;
    secretMessage?: string;
    onMouseOverMessage?: string;
}

const ClickCounter = ({
    title,
    on10ClickMessage,
    onMouseOverMessage,
    secretMessage
}: ClickCounterProps) => {
    const [count, setCount] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const handleSetCount = () => {
        setCount(count + 1);
    }


    const displayMessage = count >= 10 ? on10ClickMessage : null;
    const secret = count == 69 ? secretMessage : null;
    return (
        <div className="card">
            <h2>{title}</h2>
            {isMouseOver && <p>{onMouseOverMessage}</p>}
            <button
                onClick={handleSetCount}
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                // ask about onMouseOver and onMouseOut
            >
                count is {count}
            </button>
            {<p>{displayMessage}</p>}
            {<p>{secret}</p>}
        </div>
    )
}

export default ClickCounter