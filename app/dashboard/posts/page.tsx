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
import { Post } from '@/lib/types';
import axiosInstance from '@/lib/axios';

type PostCategory = 'all' | 'traditional' | 'digital';


export default function AdminPosts() {
       const [posts, setPosts] = useState<Post[]>([]);
       const [searchTerm, setSearchTerm] = useState('');
       const [selectedCategory, setSelectedCategory] = useState<PostCategory>('all');
       const [isLoading, setIsLoading] = useState(true);
       const [postToDelete, setPostToDelete] = useState<string | null>(null);


       useEffect(() => {


              axiosInstance.get("/admindashboard/posts", {
                     headers: {
                            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                     }
              })
              .then((res) => {
                     setPosts(res.data.data);
                     console.log(res)
              })
              .catch((err) => {
                     console.log(err)
              })


              setTimeout(() => {
                     setPosts([
                            {
                                   id: "685ee7caba3d19de1a889d11",
                                   title: "any thing",
                                   description: "عضلاته مقوية قلبه ",
                                   tags: "ابو العربي شامبو البدلة_اللي_لابسها_عادل_امام",
                                   tools: null,
                                   preference: "TraditionalArt",
                                   likes: 1,
                                   comments: 1,
                                   shares: 0,
                                   createdAt: "2025-06-27T20:49:46.225+02:00",
                                   user: {
                                          name: "saikoo stark",
                                          userName: "saikoostark",
                                          userId: "26447ec2-409e-46f4-8c76-b880ffb5dcaf",
                                          profileImageUrl: "https://vvdxwhovmloehbfizuos.supabase.co/storage/v1/object/public/profile/user/c71c2e83-4d6f-4932-8168-f7900d72cc9b.jpg",
                                          coverImageUrl: "https://vvdxwhovmloehbfizuos.supabase.co/storage/v1/object/public/profile/user/a668a093-d755-4478-939c-098bb01198bd.jpg",
                                          isActive: true,
                                          rank: "Unrated",
                                          showActive: true
                                   },
                                   mentions: [],
                                   media: [],
                                   isLiked: false,
                                   sharedPost: null
                            },
                            {
                                   id: "685ee210ba3d19de1a889d0d",
                                   title: "sss",
                                   description: "@saikoostark@Shebl",
                                   tags: "",
                                   tools: "",
                                   preference: "TraditionalArt",
                                   likes: 0,
                                   comments: 1,
                                   shares: 0,
                                   createdAt: "2025-06-27T20:25:20.323+02:00",
                                   user: {
                                          name: "Eslam Amin",
                                          userName: "solom",
                                          userId: "19e91e2c-fe69-4fdd-8182-60e3f99619ec",
                                          profileImageUrl: "https://vvdxwhovmloehbfizuos.supabase.co/storage/v1/object/public/profile/user/02d007ce-915f-485f-874b-9c78f4beedf1.png",
                                          coverImageUrl: null,
                                          isActive: true,
                                          rank: "Unrated",
                                          showActive: true
                                   },
                                   mentions: [
                                          {
                                                 start: 0,
                                                 length: 12,
                                                 mentionedUserId: "26447ec2-409e-46f4-8c76-b880ffb5dcaf",
                                                 createdAt: "2025-06-27T18:25:20.379Z"
                                          },
                                          {
                                                 start: 12,
                                                 length: 6,
                                                 mentionedUserId: "0a901710-f2d8-4542-96ec-5c3ea259141a",
                                                 createdAt: "2025-06-27T18:25:20.379Z"
                                          }
                                   ],
                                   media: [],
                                   isLiked: false,
                                   sharedPost: null
                            }
                     ]);
                     setIsLoading(false);
              }, 1000);
       }, []);

       const filteredPosts = posts.filter(post => {
              const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     post.id.includes(searchTerm);
              const matchesCategory = selectedCategory === 'all' || post.preference === selectedCategory;
              return matchesSearch && matchesCategory;
       });

       const handleDeletePost = (id: string) => {
              setPosts(posts.filter(post => post.id !== id));
              setPostToDelete(null);
       };

       return (
              <div className="flex min-h-screen w-full absolute bg-font pt-12 md:pt-0">

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
                                                                             {post.media[0]?.url ? 
                                                                             <img
                                                                                    src={post.media[0]?.url}
                                                                                    alt={post.title}
                                                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                             />
                                                                             : (
                                                                                    <div
                                                                                           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 bg-secondary"
                                                                                    ></div>
                                                                             )
                                                                      }
                                                                             <div className="absolute bottom-2 left-2 bg-secondary/90 text-font text-xs px-2 py-1 rounded flex items-center gap-1">
                                                                                    {post.preference === 'traditional' ? (
                                                                                           <FaPalette className="text-primary" />
                                                                                    ) : (
                                                                                           <FaDigitalTachograph className="text-accent" />
                                                                                    )}
                                                                                    <span>
                                                                                           {post.preference === 'traditional' ? 'Traditional' : 'Digital'}
                                                                                    </span>
                                                                             </div>
                                                                      </div>

                                                                      {/* Post Content */}
                                                                      <div className="p-4">
                                                                             <h3 className="text-lg font-bold text-secondary mb-3 line-clamp-2">
                                                                                    {post.title}
                                                                             </h3>

                                                                             <p className="text-lg font-bold text-secondary mb-3 line-clamp-2">
                                                                                    {post.description}
                                                                             </p>

                                                                             <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                                                                    <FiUser className="text-primary" />
                                                                                    <span>
                                                                                           {post.user.userName} <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">ID: {post.id}</span>
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