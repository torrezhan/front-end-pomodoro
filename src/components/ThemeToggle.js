import React, { useState, useEffect } from "react";

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(() => {
        // Get initial state from localStorage or default to false
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        // Update body class and save to localStorage when darkMode changes
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="theme-toggle">
            <button onClick={toggleTheme}>
                {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
            </button>
        </div>
    );
}

export default ThemeToggle;
