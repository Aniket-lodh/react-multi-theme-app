import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeKey = "minimal" | "dark" | "colorful";

interface ThemeContextValue {
    theme: ThemeKey;
    setTheme: (key: ThemeKey) => void;
}

const defaultTheme: ThemeKey = "minimal";
const ThemeContext = createContext<ThemeContextValue>({
    theme: defaultTheme,
    setTheme: () => { }
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeKey>(() => {
        return (localStorage.getItem("theme") as ThemeKey) || defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
