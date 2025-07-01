"use client"

import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiLogIn, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios'; // Make sure this is properly configured

import logo from '@/assets/img/logo.png';

export default function AdminLoginPage() {
       const router = useRouter();
       const [formData, setFormData] = useState({
              username: '',
              password: ''
       });
       const [showPassword, setShowPassword] = useState(false);
       const [isSubmitting, setIsSubmitting] = useState(false);
       const [errors, setErrors] = useState<Record<string, string>>({});
       const [apiError, setApiError] = useState('');

       const fadeIn = {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
       };

       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = e.target;
              setFormData(prev => ({
                     ...prev,
                     [name]: value
              }));
              // Clear error when user types
              if (errors[name]) {
                     setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors[name];
                            return newErrors;
                     });
              }
              if (apiError) setApiError('');
       };

       const validateForm = () => {
              const newErrors: Record<string, string> = {};

              if (!formData.username.trim()) {
                     newErrors.username = 'Username is required';
              }

              if (!formData.password) {
                     newErrors.password = 'Password is required';
              } else if (formData.password.length < 7) {
                     newErrors.password = 'Password must be at least 7 characters';
              }

              setErrors(newErrors);
              return Object.keys(newErrors).length === 0;
       };

       const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              if (!validateForm()) return;

              setIsSubmitting(true);
              setApiError('');

              try {
                     const response = await axiosInstance.post('/auth/admin/login', {
                            username: formData.username,
                            password: formData.password
                     });

                     console.log('API Response:', response.data);

                     // Assuming the response contains an access token and user data
                     if (response.status === 200) {
                            // Store the token (adjust according to your auth flow)
                            localStorage.setItem('jwtToken', response.data.data.jwtToken);

                            // Redirect to admin dashboard
                            router.push('/dashboard/reports');
                     } else {
                            throw new Error('Authentication failed');
                     }
              } catch (error: any) {
                     console.error('Login error:', error);
                     setApiError(
                            error.response?.data?.message ||
                            error.message ||
                            'An error occurred during login'
                     );
              } finally {
                     setIsSubmitting(false);
              }
       };

       return (
              <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex items-center justify-center p-4">
                     <Head>
                            <title>Admin Login | Articlash</title>
                     </Head>

                     <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="w-full max-w-md bg-white rounded-xl shadow-card overflow-hidden border border-border"
                     >
                            <div className="p-8">
                                   <Link href={"/"} className="flex justify-center mb-6">
                                          <Image
                                                 src={logo}
                                                 alt="Articlash Logo"
                                                 width={94}
                                                 height={94}
                                                 className="h-20 w-auto rounded-full object-cover"
                                          />
                                   </Link>

                                   <h1 className="text-3xl font-waterlily text-center text-primary mb-2">Admin Portal</h1>
                                   <p className="text-font2 text-center mb-8">Sign in to access the admin dashboard</p>

                                   {apiError && (
                                          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">
                                                 {apiError}
                                          </div>
                                   )}

                                   <form onSubmit={handleSubmit} className="space-y-6">
                                          <div>
                                                 <label htmlFor="username" className="block text-sm font-garet text-secondary mb-2">Username</label>
                                                 <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                               <FiUser className="text-font2" />
                                                        </div>
                                                        <input
                                                               id="username"
                                                               name="username"
                                                               type="text"
                                                               autoComplete="username"
                                                               required
                                                               value={formData.username}
                                                               onChange={handleChange}
                                                               className={`block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all`}
                                                               placeholder="admin_username"
                                                        />
                                                 </div>
                                                 {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                                          </div>

                                          <div>
                                                 <label htmlFor="password" className="block text-sm font-garet text-secondary mb-2">Password</label>
                                                 <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                               <FiLock className="text-font2" />
                                                        </div>
                                                        <input
                                                               id="password"
                                                               name="password"
                                                               type={showPassword ? "text" : "password"}
                                                               autoComplete="current-password"
                                                               required
                                                               value={formData.password}
                                                               onChange={handleChange}
                                                               className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all`}
                                                               placeholder="••••••••"
                                                        />
                                                        <button
                                                               type="button"
                                                               className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                               onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                               {showPassword ? <FiEyeOff className="text-font2" /> : <FiEye className="text-font2" />}
                                                        </button>
                                                 </div>
                                                 {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                          </div>

                                          <div>
                                                 <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-garet text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                                 >
                                                        {isSubmitting ? (
                                                               <>
                                                                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                      </svg>
                                                                      Signing In...
                                                               </>
                                                        ) : (
                                                               <>
                                                                      <FiLogIn className="mr-2" /> Sign In
                                                               </>
                                                        )}
                                                 </button>
                                          </div>
                                   </form>

                                   {/* <div className="mt-6 text-center text-sm text-font2">
                                          Forgot your password?{' '}
                                          <Link href="/admin/forgot-password" className="text-primary hover:text-accent">
                                                 Reset it here
                                          </Link>
                                   </div> */}
                            </div>
                     </motion.div>
              </div>
       );
}