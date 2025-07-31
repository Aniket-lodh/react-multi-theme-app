import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const renderDarkThemeLayout = () => (
        <div className="min-h-screen bg-app">
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 h-full w-80 bg-card border-r border-theme z-50 overflow-y-auto"
                        >
                            <SidebarContent onClose={() => setSidebarOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex min-h-screen">
                {!isMobile && (
                    <aside className="w-80 bg-card border-r border-theme flex-shrink-0 overflow-y-auto">
                        <SidebarContent />
                    </aside>
                )}

                <main className="flex-1 overflow-x-hidden">
                    {isMobile && (
                        <div className="sticky top-16 bg-card border-b border-theme p-4 z-30">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 text-primary hover:bg-primary/10 rounded-md"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <div className="p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );

    const renderMinimalLayout = () => (
        <div className="bg-app min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </div>
        </div>
    );

    const renderColorfulLayout = () => (
        <div className="bg-app min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </div>
    );

    return (
        <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-app font-theme min-h-screen"
        >
            {theme === 'dark' && renderDarkThemeLayout()}
            {theme === 'minimal' && renderMinimalLayout()}
            {theme === 'colorful' && renderColorfulLayout()}
        </motion.div>
    );
};

const SidebarContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
    <div className="p-6 space-y-6">
        {onClose && (
            <div className="flex justify-between items-center pb-4 border-b border-theme">
                <h3 className="text-lg font-bold text-primary">Navigation</h3>
                <button
                    onClick={onClose}
                    className="p-2 text-secondary hover:text-primary"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        )}

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Dark Theme Features</h3>
            <div className="space-y-3">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-app mb-2">Layout</h4>
                    <p className="text-sm text-secondary">Sophisticated sidebar design with elegant spacing</p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-app mb-2">Typography</h4>
                    <p className="text-sm text-secondary">Premium serif fonts for enhanced readability</p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-semibold text-app mb-2">Experience</h4>
                    <p className="text-sm text-secondary">Refined user interface with smooth interactions</p>
                </div>
            </div>
        </div>
    </div>
);

export default Layout;
