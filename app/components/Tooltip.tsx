import React from 'react';

interface TooltipProps {
    message: string;
    display: boolean;
}

function Tooltip({ message, display }: TooltipProps) {
    return (
        <div
            className={`absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 w-max transition-opacity duration-300 ${display ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ transition: 'opacity 0.4s ease, visibility 0.3s ease' }}
        >
            <div className="relative">
                <div className="text-sm bg-black text-white text-center rounded-xl border-sky-700 shadow-lg shadow-sky-400 border-b-2 px-3 py-2 w-36">
                    {message}
                </div>
                <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45 bg-black border-b-2 border-r-2 border-sky-400 w-3 h-3"></div>
            </div>
        </div>
    );
}

export default Tooltip;
