// src/Character.js
import { useState } from "react";

const Character = ({ name, label, onClick, count, SvgComponent, disabled }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`flex flex-col items-center select-none w-full max-w-xs sm:max-w-none ${
                disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={() => !disabled && setHovered(true)}
            onMouseLeave={() => !disabled && setHovered(false)}
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                    onClick();
                }
            }}
        >
            {/* SVG Character + Floating Heart - Responsive sizes */}
            <div
                className={`w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 relative group ${
                    hovered ? "brightness-110 scale-105 transition-all duration-300" : "transition-all duration-300"
                }`}
            >
                {/* Floating Heart Animation on Hover */}
                {hovered && (
                    <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-pink-400 text-2xl sm:text-3xl animate-floatHeart pointer-events-none">
                        💖
                    </div>
                )}

                {/* Character SVG */}
                <SvgComponent className="w-full h-full object-cover z-10" />
            </div>

            {/* Name and counter - Responsive text sizes */}
            <div className="text-center">
                <div className="font-semibold text-base sm:text-lg">{name}</div>
                <div className="text-pink-600 font-bold text-lg sm:text-xl">{count} ❤️</div>
            </div>
        </div>
    );
};

export default Character;