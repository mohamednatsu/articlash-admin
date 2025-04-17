"use client";

import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiMeh } from 'react-icons/fi';
import { FaPalette } from 'react-icons/fa';
import Link from 'next/link';

export default function NotFoundPage() {
       return (
              <div className="min-h-screen bg-gray-50 font-garet flex flex-col items-center justify-center p-4 text-center">
                     {/* Animated background elements */}
                     <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
                     />
                     <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-xl"
                     />

                     {/* Main content */}
                     <div className="relative z-10 max-w-2xl mx-auto">
                            <motion.div
                                   initial={{ y: -20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.6 }}
                                   className="flex justify-center mb-6"
                            >
                                   <div className="relative">
                                          <FaPalette className="text-6xl text-primary" />
                                          <FiMeh className="text-4xl text-secondary absolute -bottom-2 -right-2" />
                                   </div>
                            </motion.div>

                            <motion.h1
                                   initial={{ y: -20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.6, delay: 0.2 }}
                                   className="text-6xl md:text-8xl font-bold text-secondary mb-4"
                            >
                                   404
                            </motion.h1>

                            <motion.h2
                                   initial={{ y: -20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.6, delay: 0.3 }}
                                   className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
                            >
                                   Oops! Creative block encountered
                            </motion.h2>

                            <motion.p
                                   initial={{ y: -20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.6, delay: 0.4 }}
                                   className="text-lg text-gray-600 mb-8 max-w-lg mx-auto"
                            >
                                   The page you're looking for doesn't exist or has been moved.
                                   Let's get you back to creating amazing art!
                            </motion.p>

                            <motion.div
                                   initial={{ y: -20, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   transition={{ duration: 0.6, delay: 0.5 }}
                                   className="flex flex-col sm:flex-row justify-center gap-4"
                            >
                                   <Link
                                          href="/"
                                          className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-accent transition-colors"
                                   >
                                          <FiHome className="mr-2" />
                                          Return Home
                                   </Link>

                            </motion.div>
                     </div>

                     {/* Footer */}
                     <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="absolute bottom-8 text-gray-500 text-sm"
                     >
                            © {new Date().getFullYear()} Articlash - For Creative Minds
                     </motion.div>
              </div>
       );
}