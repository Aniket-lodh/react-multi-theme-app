import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 3000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1
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
                className={`space-y-8 w-full ${theme === 'colorful' ? 'text-center' : theme === 'dark' ? 'max-w-4xl mx-auto' : 'max-w-2xl mx-auto'}`}
            >
                <motion.section variants={itemVariants} className="space-y-4 mt-4 sm:mt-6">
                    <h1 className={`font-bold text-primary ${theme === 'colorful' ? 'text-3xl sm:text-4xl lg:text-6xl' : theme === 'dark' ? 'text-2xl sm:text-3xl lg:text-5xl' : 'text-xl sm:text-2xl lg:text-4xl'}`}>
                        {theme === 'colorful' ? '💌 Get In Touch!' : 'Contact Us'}
                    </h1>

                    <p className={`text-secondary ${theme === 'colorful' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
                        {theme === 'minimal'
                            ? 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
                            : theme === 'dark'
                                ? 'Connect with our team for inquiries, collaboration opportunities, or technical discussions.'
                                : 'We\'re super excited to hear from you! Drop us a line and let\'s chat! 🎉'
                        }
                    </p>
                </motion.section>

                <div className={`grid gap-8 ${theme === 'dark' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    <motion.section variants={itemVariants}>
                        <div className="bg-card p-6 sm:p-8 space-y-6">
                            <h2 className={`font-semibold text-app ${theme === 'colorful' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                                {theme === 'colorful' ? '📝 Send us a Message' : 'Send Message'}
                            </h2>

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 bg-green-100 text-green-800 rounded-md border border-green-300"
                                >
                                    {theme === 'colorful'
                                        ? '🎉 Yay! Your message was sent successfully!'
                                        : '✅ Message sent successfully! We\'ll get back to you soon.'
                                    }
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-app font-medium mb-2 text-sm">
                                            {theme === 'colorful' ? '👤 Your Name' : 'Name *'}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-app/5 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                            placeholder={theme === 'colorful' ? 'What should we call you?' : 'Enter your name'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-app font-medium mb-2 text-sm">
                                            {theme === 'colorful' ? '📧 Email Address' : 'Email *'}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-app/5 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                            placeholder={theme === 'colorful' ? 'your@email.com' : 'Enter your email'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-app font-medium mb-2 text-sm">
                                        {theme === 'colorful' ? '💭 What\'s this about?' : 'Subject'}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-app/5 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                        placeholder={theme === 'colorful' ? 'Give us a hint!' : 'Enter subject'}
                                    />
                                </div>

                                <div>
                                    <label className="block text-app font-medium mb-2 text-sm">
                                        {theme === 'colorful' ? '✨ Your Message' : 'Message *'}
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-app/5 border border-theme rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical text-sm"
                                        placeholder={theme === 'colorful' ? 'Tell us everything! We love details! 💕' : 'Enter your message'}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 px-6 bg-primary text-white font-medium rounded-md hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${theme === 'colorful' ? 'rounded-full' : ''
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                            />
                                            {theme === 'colorful' ? 'Sending Magic...' : 'Sending...'}
                                        </span>
                                    ) : (
                                        theme === 'colorful' ? '🚀 Send Message!' : 'Send Message'
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants} className="space-y-6">
                        <div className="bg-card p-6 sm:p-8 space-y-6">
                            <h2 className={`font-semibold text-app ${theme === 'colorful' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                                }`}>
                                {theme === 'colorful' ? '📍 Find Us Here' : 'Contact Information'}
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-primary mt-1 text-lg">{theme === 'colorful' ? '🏢' : '📍'}</span>
                                    <div>
                                        <strong className="text-app text-sm">Address</strong>
                                        <p className="text-secondary text-sm">
                                            #01-04, 75 Ayer Rajah <br />
                                            India
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-primary mt-1 text-lg">{theme === 'colorful' ? '📞' : '☎️'}</span>
                                    <div>
                                        <strong className="text-app text-sm">Phone</strong>
                                        <p className="text-secondary text-sm">+91 12345 67890</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-primary mt-1 text-lg">{theme === 'colorful' ? '✉️' : '📧'}</span>
                                    <div>
                                        <strong className="text-app text-sm">Email</strong>
                                        <p className="text-secondary text-sm">hr@multithemeapp-inc.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <span className="text-primary mt-1 text-lg">{theme === 'colorful' ? '🌐' : '🔗'}</span>
                                    <div>
                                        <strong className="text-app text-sm">Website</strong>
                                        <p className="text-secondary text-sm">www.multithemeapp-inc.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-6 space-y-4">
                            <h3 className="font-semibold text-app text-base">
                                {theme === 'colorful' ? '⏰ When We\'re Available' : 'Office Hours'}
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-secondary">Monday - Friday</span>
                                    <span className="text-app">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Saturday</span>
                                    <span className="text-app">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-secondary">Sunday</span>
                                    <span className="text-app">Closed</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
