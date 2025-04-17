"use client"

import { useState, useEffect } from 'react';
import {
       FiSearch,
       FiFilter,
       FiTrash2,
       FiMessageSquare,
       FiEye,
       FiHeart,
       FiUser,
       FiCalendar,
       FiAlertCircle
} from 'react-icons/fi';
import { FaPalette, FaDigitalTachograph } from 'react-icons/fa';
import Sidebar from "@/components/Sidebar";
import { SidebarItem } from "@/types";
import { TbMessageReport } from "react-icons/tb";
import { FiLogOut, FiSettings, FiUsers as FiUsersIcon } from "react-icons/fi";
import { PiRankingBold } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";

type PostCategory = 'all' | 'traditional' | 'digital';
type Post = {
       id: string;
       title: string;
       userId: string;
       username: string;
       likes: number;
       comments: number;
       category: PostCategory;
       image: string;
       createdAt: string;
};

export default function AdminPosts() {
       const [posts, setPosts] = useState<Post[]>([]);
       const [searchTerm, setSearchTerm] = useState('');
       const [selectedCategory, setSelectedCategory] = useState<PostCategory>('all');
       const [isLoading, setIsLoading] = useState(true);
       const [postToDelete, setPostToDelete] = useState<string | null>(null);

       const sidebarItems: SidebarItem[] = [
              { title: 'Reports', active: false, path: '/dashboard/reports', icon: <TbMessageReport /> },
              { title: 'Users', active: false, path: '/dashboard/users', icon: <FiUsersIcon /> },
              { title: 'Contests', active: false, path: '/dashboard/contests', icon: <PiRankingBold /> },
              { title: 'Posts', active: true, path: '/dashboard/posts', icon: <TfiGallery /> },
              { title: 'Settings', active: false, path: '/dashboard/settings', icon: <FiSettings /> },
              { title: 'Log out', active: false, path: '/dashboard/logout', icon: <FiLogOut /> },
       ];

       useEffect(() => {
              // Simulate API fetch
              setTimeout(() => {
                     setPosts([
                            {
                                   id: '1',
                                   title: 'Red water flowers',
                                   userId: '1.0',
                                   username: 'Ampa Ali',
                                   likes: 1400,
                                   comments: 400,
                                   category: 'traditional',
                                   image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                                   createdAt: '2023-05-15'
                            },
                            {
                                   id: '2',
                                   title: 'Digital landscape',
                                   userId: '2.0',
                                   username: 'Samir Khan',
                                   likes: 890,
                                   comments: 120,
                                   category: 'digital',
                                   image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                                   createdAt: '2023-06-20'
                            },
                            {
                                   id: '3',
                                   title: 'Abstract watercolor',
                                   userId: '3.0',
                                   username: 'Lina Mohamed',
                                   likes: 2100,
                                   comments: 350,
                                   category: 'traditional',
                                   image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                                   createdAt: '2023-07-10'
                            }
                     ]);
                     setIsLoading(false);
              }, 1000);
       }, []);

       const filteredPosts = posts.filter(post => {
              const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     post.id.includes(searchTerm);
              const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
              return matchesSearch && matchesCategory;
       });

       const handleDeletePost = (id: string) => {
              setPosts(posts.filter(post => post.id !== id));
              setPostToDelete(null);
       };

       return (
              <div className="flex min-h-screen w-full absolute bg-font pt-12 md:pt-0">
                     <Sidebar items={sidebarItems} />
                     <main className="flex-1 md:ml-64">
                            <div className="min-h-screen bg-gray-50 font-garet p-4 md:p-8">
                                   <div className="max-w-7xl mx-auto">
                                          {/* Header */}
                                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                                 <div>
                                                        <h1 className="text-2xl md:text-3xl font-bold text-secondary">
                                                               Manage Posts <span className="text-primary">({posts.length})</span>
                                                        </h1>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                               View, manage, and delete user posts
                                                        </p>
                                                 </div>

                                                 {/* Search and Filter */}
                                                 <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                                        <div className="relative flex-1 md:w-64">
                                                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                      <FiSearch className="text-gray-400" />
                                                               </div>
                                                               <input
                                                                      type="text"
                                                                      placeholder="Search post by title or id"
                                                                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                                      value={searchTerm}
                                                                      onChange={(e) => setSearchTerm(e.target.value)}
                                                               />
                                                        </div>

                                                        <div className="relative w-full md:w-48">
                                                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                      <FiFilter className="text-gray-400" />
                                                               </div>
                                                               <select
                                                                      className="appearance-none w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                                                                      value={selectedCategory}
                                                                      onChange={(e) => setSelectedCategory(e.target.value as PostCategory)}
                                                               >
                                                                      <option value="all">All Posts</option>
                                                                      <option value="traditional">Traditional Arts</option>
                                                                      <option value="digital">Digital Arts</option>
                                                               </select>
                                                               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                      </svg>
                                                               </div>
                                                        </div>
                                                 </div>
                                          </div>

                                          {/* Posts Grid */}
                                          {isLoading ? (
                                                 <div className="flex justify-center items-center h-64">
                                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                                                 </div>
                                          ) : filteredPosts.length === 0 ? (
                                                 <div className="text-center py-12">
                                                        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                               <FiAlertCircle className="text-primary text-3xl" />
                                                        </div>
                                                        <h3 className="text-lg font-medium text-secondary mb-1">No posts found</h3>
                                                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                                 </div>
                                          ) : (
                                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {filteredPosts.map(post => (
                                                               <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                                                                      {/* Post Image */}
                                                                      <div className="h-48 relative overflow-hidden group">
                                                                             <img
                                                                                    src={post.image}
                                                                                    alt={post.title}
                                                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                             />
                                                                             <div className="absolute bottom-2 left-2 bg-secondary/90 text-font text-xs px-2 py-1 rounded flex items-center gap-1">
                                                                                    {post.category === 'traditional' ? (
                                                                                           <FaPalette className="text-primary" />
                                                                                    ) : (
                                                                                           <FaDigitalTachograph className="text-accent" />
                                                                                    )}
                                                                                    <span>
                                                                                           {post.category === 'traditional' ? 'Traditional' : 'Digital'}
                                                                                    </span>
                                                                             </div>
                                                                      </div>

                                                                      {/* Post Content */}
                                                                      <div className="p-4">
                                                                             <h3 className="text-lg font-bold text-secondary mb-3 line-clamp-2">
                                                                                    {post.title}
                                                                             </h3>

                                                                             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                                                    <FiUser className="text-primary" />
                                                                                    <span>
                                                                                           {post.username} <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">ID: {post.userId}</span>
                                                                                    </span>
                                                                             </div>

                                                                             <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                                                    <FiCalendar className="text-primary" />
                                                                                    <span>Posted: {new Date(post.createdAt).toLocaleDateString()}</span>
                                                                             </div>

                                                                             <div className="flex justify-between text-sm">
                                                                                    <span className="flex items-center gap-1.5 text-gray-600">
                                                                                           <FiHeart className="text-red-500" />
                                                                                           <span className="font-medium">{post.likes.toLocaleString()}</span> Likes
                                                                                    </span>
                                                                                    <span className="flex items-center gap-1.5 text-gray-600">
                                                                                           <FiMessageSquare className="text-primary" />
                                                                                           <span className="font-medium">{post.comments.toLocaleString()}</span> Comments
                                                                                    </span>
                                                                             </div>
                                                                      </div>

                                                                      {/* Actions */}
                                                                      <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex justify-between">
                                                                             <button
                                                                                    onClick={() => setPostToDelete(post.id)}
                                                                                    className="text-red-500 hover:text-red-700 flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                                                                             >
                                                                                    <FiTrash2 size={16} /> Delete
                                                                             </button>
                                                                             <button className="text-primary hover:text-accent flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-primary/10 transition-colors">
                                                                                    <FiEye size={16} /> View
                                                                             </button>
                                                                             <button className="text-primary hover:text-accent flex items-center gap-1.5 text-sm px-3 py-1.5 rounded hover:bg-primary/10 transition-colors">
                                                                                    <FiMessageSquare size={16} /> Comments
                                                                             </button>
                                                                      </div>
                                                               </div>
                                                        ))}
                                                 </div>
                                          )}
                                   </div>

                                   {/* Delete Confirmation Modal */}
                                   {postToDelete && (
                                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                 <div className="bg-white rounded-xl p-6 w-full max-w-md">
                                                        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                                                               <FiAlertCircle className="text-red-500 text-3xl" />
                                                        </div>
                                                        <h2 className="text-xl font-bold text-center text-secondary mb-2">
                                                               Delete Post
                                                        </h2>
                                                        <p className="text-gray-600 text-center mb-6">
                                                               Are you sure you want to delete this post? This action cannot be undone.
                                                        </p>

                                                        <div className="flex justify-center gap-4">
                                                               <button
                                                                      onClick={() => setPostToDelete(null)}
                                                                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                                               >
                                                                      Cancel
                                                               </button>
                                                               <button
                                                                      onClick={() => handleDeletePost(postToDelete)}
                                                                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                                                               >
                                                                      <FiTrash2 /> Delete
                                                               </button>
                                                        </div>
                                                 </div>
                                          </div>
                                   )}
                            </div>
                     </main>
              </div>
       );
}