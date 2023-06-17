import React, { useState, useEffect } from "react";


export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const initialTheme = localStorage.getItem("theme") || "light";
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};