import React from "react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg" | "xl"; // spinner size
    color?: string; // tailwind color class
}

const Spinner: React.FC<SpinnerProps> = ({
    size = "lg",
    color = "border-blue-500",
}) => {
    const sizeClass = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${sizeClass[size]}`}
            ></div>
        </div>
    );
};

export default Spinner;
