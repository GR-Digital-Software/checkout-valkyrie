import React, { useState } from 'react';

export default function NumberInput() {
    const [value, setValue] = useState(1);

    const handleIncrement = () => {
        setValue(prevValue => prevValue + 1);
    };

    const handleDecrement = () => {
        setValue(prevValue => Math.max(prevValue - 1, 0)); 
    };

    return (
        <div className="flex flex-row w-fit bg-white border border-zinc-300 rounded-lg">
            <button
                className="w-7 h-7 text-zinc-400 flex items-center justify-center rounded-r-lg"
                onClick={handleIncrement}
            >
                +
            </button>
            <input
                type="text"
                className="w-7 h-7 text-zinc-950 font-medium text-center border-0 rounded-none"
                value={value}
                readOnly 
            />
            <button
                className="w-7 h-7 text-zinc-400 flex items-center justify-center rounded-l-lg"
                onClick={handleDecrement}
            >
                -
            </button>
        </div>
    );
}
