import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const themeOptions = [
    { key: "minimal", label: "Theme 1 - Minimal" },
    { key: "dark", label: "Theme 2 - Dark" },
    { key: "colorful", label: "Theme 3 - Colorful" },
] as const;

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme as any);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 300);
    };

    return (
        <AnimatePresence mode="wait">
            <motion.header
                key={theme}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full bg-card backdrop-blur-sm z-50 border-b border-theme font-theme h-16" // Added explicit height
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4 h-full">
                    <Link
                        to="/"
                        className="text-xl sm:text-2xl font-bold text-primary hover:text-accent transition-colors"
                    >
                        {theme === 'colorful' ? '🎨 MultiTheme' : 'MultiThemeApp'}
                    </Link>

                    <nav className="hidden md:flex space-x-4 lg:space-x-6">
                        {[
                            { path: '/', label: 'Home' },
                            { path: '/about', label: 'About' },
                            { path: '/contact', label: 'Contact' }
                        ].map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`px-3 py-2 rounded-md transition-all duration-200 text-sm lg:text-base ${location.pathname === path
                                    ? 'bg-primary text-white'
                                    : 'text-app hover:text-primary hover:bg-card'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-2">
                        <motion.select
                            key={theme}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            value={theme}
                            onChange={(e) => handleThemeChange(e.target.value)}
                            className="p-2 bg-card text-app border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-theme text-xs sm:text-sm"
                        >
                            {themeOptions.map((opt) => (
                                <option key={opt.key} value={opt.key} className="bg-card">
                                    {opt.label}
                                </option>
                            ))}
                        </motion.select>

                        {/* Mobile Menu button */}
                        <button
                            className="md:hidden p-2 text-app hover:text-primary"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-card border-t border-theme"
                        >
                            <nav className="p-4 space-y-2">
                                {[
                                    { path: '/', label: 'Home' },
                                    { path: '/about', label: 'About' },
                                    { path: '/contact', label: 'Contact' }
                                ].map(({ path, label }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={`block px-3 py-2 rounded-md text-sm ${location.pathname === path
                                            ? 'bg-primary text-white'
                                            : 'text-app hover:text-primary hover:bg-primary/10'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </AnimatePresence>
    );
};

export default Header;
