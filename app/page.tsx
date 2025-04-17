"use client";

import { motion } from 'framer-motion';
import { FiLogIn, FiAward, FiUsers, FiFlag, FiImage, FiBarChart2 } from 'react-icons/fi';
import { FaPalette, FaDigitalTachograph } from 'react-icons/fa';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: <FiAward className="text-3xl text-primary" />,
      title: "Contest Management",
      description: "Create and manage art contests with custom rules, judging criteria, and prizes."
    },
    {
      icon: <FiUsers className="text-3xl text-primary" />,
      title: "User Administration",
      description: "Manage creative community members, roles, and permissions with ease."
    },
    {
      icon: <FiFlag className="text-3xl text-primary" />,
      title: "Content Moderation",
      description: "Review reported content and maintain community standards."
    },
    {
      icon: <FiImage className="text-3xl text-primary" />,
      title: "Post Management",
      description: "Curate and showcase the best creative works from your community."
    },
    {
      icon: <FaPalette className="text-3xl text-primary" />,
      title: "Traditional Arts",
      description: "Specialized tools for managing traditional art submissions and categories."
    },
    {
      icon: <FaDigitalTachograph className="text-3xl text-primary" />,
      title: "Digital Arts",
      description: "Dedicated space for digital creations with proper format support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-garet">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -skew-y-6 transform origin-top-left"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-waterlily md:text-6xl font-bold text-secondary mb-6"
            >
              Welcome to <span className="text-primary">Articlash Admin</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              The ultimate dashboard for managing your creative social platform
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/login"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-accent transition-colors duration-300"
              >
                <FiLogIn className="mr-2" />
                Admin Login
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-secondary"
            >
              Powerful Features for Creative Communities
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to manage contests, users, and content in one place
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary text-center mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-secondary text-font">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-xl">Creative Users</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-xl">Art Contests</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-xl">Art Submissions</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-secondary mb-6"
          >
            Ready to manage your creative community?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-10"
          >
            Join thousands of community managers who trust Articlash to showcase creative talent
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/login"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-accent transition-colors duration-300"
            >
              <FiLogIn className="mr-2" />
              Get Started Now
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}