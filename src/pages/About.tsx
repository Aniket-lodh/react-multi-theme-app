import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const About: React.FC = () => {
    const { theme } = useTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="w-full mt-18">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`space-y-8 w-full ${theme === 'colorful' ? 'text-center' :
                    theme === 'dark' ? 'max-w-4xl mx-auto' : 'max-w-3xl mx-auto'
                    }`}
            >
                <motion.section variants={itemVariants} className="space-y-4 mt-4 sm:mt-6">
                    <h1 className={`font-bold text-primary ${theme === 'colorful' ? 'text-3xl sm:text-4xl lg:text-6xl' :
                        theme === 'dark' ? 'text-2xl sm:text-3xl lg:text-5xl' :
                            'text-xl sm:text-2xl lg:text-4xl'
                        }`}>
                        {theme === 'colorful' ? '🌟 About Our Amazing Team!' : 'About MultiTheme App'}
                    </h1>

                    <p className={`text-secondary leading-relaxed ${theme === 'colorful' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                        {theme === 'minimal'
                            ? 'A clean, efficient demonstration of React theming capabilities with TypeScript and modern web practices.'
                            : theme === 'dark'
                                ? 'An elegant showcase of sophisticated theme architecture, demonstrating advanced React patterns and premium user experience design.'
                                : 'Welcome to our super fun and colorful world! 🎨✨ We love creating amazing experiences that make you smile! 😊'
                        }
                    </p>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className={`font-semibold text-app mb-6 ${theme === 'colorful' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                        {theme === 'colorful' ? '🚀 Cool Features' : 'Technical Features'}
                    </h2>

                    <div className={`grid gap-4 sm:gap-6 ${theme === 'minimal' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : theme === 'dark' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                        {[
                            {
                                title: theme === 'colorful' ? '🎨 Three Amazing Themes' : 'Multi-Theme System',
                                desc: theme === 'colorful'
                                    ? 'Switch between minimalist, dark, and our super colorful theme!'
                                    : 'Dynamic theme switching with distinct layouts, typography, and visual styles.'
                            },
                            {
                                title: theme === 'colorful' ? '💾 Memory Magic' : 'Persistent Storage',
                                desc: theme === 'colorful'
                                    ? 'Your favorite theme stays with you even after closing the app!'
                                    : 'LocalStorage integration ensures theme preferences persist across sessions.'
                            },
                            {
                                title: theme === 'colorful' ? '📱 Works Everywhere' : 'Responsive Design',
                                desc: theme === 'colorful'
                                    ? 'Looks fantastic on phones, tablets, and computers!'
                                    : 'Fully responsive layouts optimized for all device sizes and orientations.'
                            },
                            {
                                title: theme === 'colorful' ? '⚡ Super Fast' : 'Performance Optimized',
                                desc: theme === 'colorful'
                                    ? 'Lightning-fast animations and smooth transitions!'
                                    : 'Optimized font loading, efficient re-renders, and smooth animations.'
                            },
                            {
                                title: theme === 'colorful' ? '🔒 Safe & Secure' : 'Security First',
                                desc: theme === 'colorful'
                                    ? 'Built with the latest security features to keep you safe!'
                                    : 'Content Security Policy, input sanitization, and secure API practices.'
                            },
                            {
                                title: theme === 'colorful' ? '🛍️ Shopping Fun' : 'API Integration',
                                desc: theme === 'colorful'
                                    ? 'Real products from a cool shopping API!'
                                    : 'Live data integration with FakeStore API and error handling.'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    scale: theme === 'colorful' ? 1.05 : 1.02,
                                    rotate: theme === 'colorful' ? 2 : 0
                                }}
                                className={`bg-card p-4 sm:p-6 space-y-3 ${theme === 'colorful' ? 'shadow-lg hover:shadow-xl' : 'shadow-md'
                                    }`}
                            >
                                <h3 className={`font-semibold text-primary ${theme === 'dark' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                                    }`}>
                                    {feature.title}
                                </h3>
                                <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <div className="bg-card p-6 sm:p-8 space-y-4">
                        <h2 className={`font-semibold text-primary ${theme === 'colorful' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                            {theme === 'colorful' ? '🏢 About Hipster Company' : 'Company Information'}
                        </h2>

                        <div className="space-y-4 text-app">
                            <p className="text-sm sm:text-base">
                                <strong>MultiThemeApp Pte. Ltd.</strong> specializes in cutting-edge React applications,
                                UI/UX design, responsive development, and performance optimization.
                            </p>

                            <div className={`grid gap-6 ${theme === 'minimal' ? 'grid-cols-1 md:grid-cols-2' : theme === 'dark' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-primary mt-1 text-lg">🏢</span>
                                        <div>
                                            <strong className="text-app text-sm">Address</strong>
                                            <p className="text-secondary text-sm">
                                                #01-04, 75 Ayer Rajah <br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <span className="text-primary mt-1 text-lg">📞</span>
                                        <div>
                                            <strong className="text-app text-sm">Phone</strong>
                                            <p className="text-secondary text-sm">+91 12345 67890</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-primary mt-1 text-lg">✉️</span>
                                        <div>
                                            <strong className="text-app text-sm">Email</strong>
                                            <p className="text-secondary text-sm">hr@multithemeapp-inc.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <span className="text-primary mt-1 text-lg">🌐</span>
                                        <div>
                                            <strong className="text-app text-sm">Website</strong>
                                            <p className="text-secondary text-sm">www.multithemeapp-inc.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-theme">
                                <p className="text-xs sm:text-sm text-secondary">
                                    UEN: 1244321408D | © 2025 MultiThemeApp Pte. Ltd. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default About;
