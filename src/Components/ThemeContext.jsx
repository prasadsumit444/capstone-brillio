import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("Light");


    useEffect(() => {
        const root = window.document.getElementById("root");
        if (root.classList.length == 0) {
            root.classList.add(theme == "Dark" ? "dark" : "light");
        } else if (theme == "Dark") {
            root.classList.replace("light", "dark");
        }
        else {
            root.classList.replace("dark", "light");
        }
        console.log("Theme updated")
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
