import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarItem } from '@/types';
import { TbMessageReport } from "react-icons/tb";
import logo from "@/assets/img/logo.png"

interface SidebarProps {
       items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
       const [isMobile, setIsMobile] = useState(false);
       const [isOpen, setIsOpen] = useState(false);

       useEffect(() => {
              const handleResize = () => {
                     setIsMobile(window.innerWidth < 768);
              };

              handleResize();
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
       }, []);

       // Separate regular items from action items (Settings and Log out)
       const regularItems = items.filter(item => !['Settings', 'Log out'].includes(item.title));
       const actionItems = items.filter(item => ['Settings', 'Log out'].includes(item.title));

       return (
              <>
                     {/* Mobile menu button */}
                     {isMobile && (
                            <button
                                   onClick={() => setIsOpen(!isOpen)}
                                   className="fixed top-4 left-4 z-50 p-2 rounded-md bg-secondary text-primary shadow-lg"
                            >
                                   <svg
                                          className="w-6 h-6"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                   >
                                          <path
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 strokeWidth={2}
                                                 d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                          />
                                   </svg>
                            </button>
                     )}

                     {/* Sidebar */}
                     <AnimatePresence>
                            {(!isMobile || isOpen) && (
                                   <motion.div
                                          initial={{ x: isMobile ? -300 : -20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className={`w-64 bg-secondary text-font h-screen fixed left-0 top-0 p-6 shadow-lg z-40 ${isMobile ? 'pt-16' : ''
                                                 }`}
                                   >
                                          <div className="flex justify-center items-center rounded-md">

                                          <motion.img
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 src={logo.src}
                                                 transition={{ delay: 0.1 }}
                                                 className="rounded-md w-[50%] h-[8%] mb-4 object-cover"
                                                 >
                                                 
                                          </motion.img>
                                                 </div>

                                          <nav className="h-full flex flex-col">
                                                 <motion.ul
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={{
                                                               hidden: { opacity: 0 },
                                                               visible: {
                                                                      opacity: 1,
                                                                      transition: {
                                                                             staggerChildren: 0.1
                                                                      }
                                                               }
                                                        }}
                                                        className="space-y-4 "
                                                 >
                                                        {regularItems.map((item) => (
                                                               <motion.li
                                                                      key={item.title}
                                                                      variants={{
                                                                             hidden: { x: -20, opacity: 0 },
                                                                             visible: { x: 0, opacity: 1 }
                                                                      }}
                                                               >
                                                                      <Link href={item.path} onClick={() => isMobile && setIsOpen(false)}>
                                                                             <motion.div
                                                                                    whileHover={{ scale: 1.02 }}
                                                                                    whileTap={{ scale: 0.98 }}
                                                                                    className={`flex items-center p-3 rounded-lg transition-all ${item.active ? 'bg-accent text-secondary' : 'hover:bg-primary hover:bg-opacity-20'
                                                                                           }`}
                                                                             >
           

                                                                                    {/* Icon can be added here */}
                                                                                    <div className={` text-[20px] mr-2 ${item.active ? 'text-secondary' : 'text-font'}`}>
                                                                                           {item.icon}
                                                                                    </div>
                                                                                    <span className="font-garet">{item.title}</span>

                                                                             </motion.div>
                                                                      </Link>
                                                               </motion.li>
                                                        ))}
                                                 </motion.ul>

                                                 {/* Action buttons at bottom */}
                                                 <div className="md:mt-[110%] mt-[50%] pt-4 border-t border-primary border-opacity-20">
                                                        {actionItems.map((item) => (
                                                               <motion.div
                                                                      key={item.title}
                                                                      variants={{
                                                                             hidden: { x: -20, opacity: 0 },
                                                                             visible: { x: 0, opacity: 1 }
                                                                      }}
                                                                      initial="hidden"
                                                                      animate="visible"
                                                                      transition={{ delay: 0.2 }}
                                                                      className='my-4'
                                                               >
                                                                      <Link href={item.path} className='my-3' onClick={() => isMobile && setIsOpen(false)}>
                                                                             <motion.button
                                                                                    whileHover={{ scale: 1.02 }}
                                                                                    whileTap={{ scale: 0.98 }}
                                                                                    className={`w-full text-left p-3 rounded-lg transition-all font-garet flex ${item.title === 'Log out'
                                                                                                  ? 'bg-red-500 bg-opacity-20 text-red-500 hover:bg-opacity-30'
                                                                                                  : 'bg-primary bg-opacity-10 text-primary hover:bg-opacity-20'
                                                                                           }`}
                                                                             >
                                                                                    <div className={` text-[20px] mr-2 `}>
                                                                                           {item.icon}
                                                                                    </div>
                                                                                    {item.title}
                                                                             </motion.button>
                                                                      </Link>
                                                               </motion.div>
                                                        ))}
                                                 </div>
                                          </nav>
                                   </motion.div>
                            )}
                     </AnimatePresence>

                     {/* Overlay for mobile */}
                     <AnimatePresence>
                            {isMobile && isOpen && (
                                   <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 0.5 }}
                                          exit={{ opacity: 0 }}
                                          onClick={() => setIsOpen(false)}
                                          className="fixed inset-0 z-30 bg-black"
                                   />
                            )}
                     </AnimatePresence>
              </>
       );
};

export default Sidebar;