import axios from 'axios';
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from "../pages/Auth/AuthGuard";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("LIGHT");
    const { userId } = useAuth();

    useEffect(() => {
        axios.get(`http://localhost:8101/user/${userId}/getUser`)
            .then(response => {
                setTheme(response.data.theme);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    useEffect(() => {
        const root = window.document.getElementById("root");
        if (root.classList.length == 0) {
            root.classList.add(theme == "DARK" ? "dark" : "light");
        } else if (theme == "DARK") {
            root.classList.replace("light", "dark");
        }
        else {
            root.classList.replace("dark", "light");
        }
        console.log("Theme updated")
    }, [theme]);

    const contextValue = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
