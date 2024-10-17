import { useState } from 'react';
import "./App.css";

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white", "cyan", "magenta", "lime", "maroon", "navy", "olive", "teal", "silver", "gold", "beige"];

const ColorChanger = () => {
    const [color, setColor] = useState(0);
    const nextColor = (color + 1) % colors.length;

    return (
        <div className='card'>
            <button style={{ backgroundColor: colors[color] }}
                onClick={() => {
                    setColor(nextColor);
                }}
            >
             <i>Change to {colors[nextColor]}</i>
            </button>
            <p style={{ color: colors[color]}}>{colors[color]}</p>
         </div>
    )
}

export default ColorChanger;