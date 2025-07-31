import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
    category: string;
    rating?: number;
    discountPercentage?: number;
    stock?: number;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        axios
            .get<{ products: Product[] }>("https://dummyjson.com/products?limit=15", {
                timeout: 3000,
            })
            .then((res) => setProducts(res.data.products))
            .catch((err) => {
                if (err.code === 'ECONNABORTED') {
                    setError("The request took too long. Please try again later.");
                } else {
                    setError("Failed to load products. Please try again later.");
                }
                console.error("Fetch error:", err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    const getGridClass = () => {
        switch (theme) {
            case 'minimal':
                return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
            case 'dark':
                return 'grid grid-cols-1 lg:grid-cols-2 gap-8';
            case 'colorful':
                return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
            default:
                return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                />
                <span className="ml-3 text-app font-theme">Loading products...</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                <h2 className="text-2xl font-semibold text-red-500 mb-2">Oops!</h2>
                <p className="text-app mb-4">{error}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors"
                >
                    Retry
                </motion.button>
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-10">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
            >
                <h1 className={`font-bold text-primary mb-4 ${theme === 'colorful' ? 'text-4xl md:text-6xl' : theme === 'dark' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                    Welcome to MultiTheme Store
                </h1>
                <p className={`text-secondary max-w-2xl mx-auto ${theme === 'colorful' ? 'text-lg' : 'text-base'}`}>
                    {theme === 'minimal'
                        ? 'Clean, simple shopping experience with quality products.'
                        : theme === 'dark'
                            ? 'Discover premium products in our elegant, sophisticated marketplace.'
                            : 'Colorful collection of amazing products just for you! 🌈✨'
                    }
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-accent transition-colors"
                >
                    {theme === 'colorful' ? '🛍️ Start Shopping' : 'Shop Now'}
                </motion.button>
            </motion.section>

            <section>
                <h2 className={`font-bold text-app mb-6 ${theme === 'colorful' ? 'text-2xl' : 'text-xl'}`}>
                    Featured Products
                </h2>

                <div className={getGridClass()}>
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                scale: theme === 'colorful' ? 1.05 : 1.02,
                                y: theme === 'dark' ? -5 : -2
                            }}
                            className={`bg-card p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${theme === 'colorful' ? 'transform hover:rotate-1' : ''}`}
                        >
                            <div className="aspect-square mb-4 overflow-hidden rounded-md bg-gray-100">
                                <img
                                    src={product.images?.[0] || product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <h3 className={`font-semibold text-app mb-2 line-clamp-2 ${theme === 'dark' ? 'text-lg' : 'text-base'}`}>
                                {product.title}
                            </h3>

                            <p className="text-secondary text-sm mb-3 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className={`font-bold text-primary ${theme === 'colorful' ? 'text-xl' : 'text-lg'}`}>
                                    ${product.price}
                                </span>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-accent transition-colors ${theme === 'colorful' ? 'rounded-full' : ''}`}
                                >
                                    {theme === 'colorful' ? '💝 Add' : 'Add to Cart'}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
