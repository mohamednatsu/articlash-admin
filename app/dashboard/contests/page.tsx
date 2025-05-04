"use client";
import { useState, useRef, ChangeEvent } from 'react';
import { FiTrash2, FiEdit, FiClock, FiUsers, FiCalendar, FiPlus, FiImage, FiX } from 'react-icons/fi';
import { FaPalette, FaDigitalTachograph } from 'react-icons/fa';
import Sidebar from "@/components/Sidebar";
import { SidebarItem } from "@/types";
import { TbMessageReport } from "react-icons/tb";
import { FiLogOut, FiSettings, FiUsers as FiUsersIcon } from "react-icons/fi";
import { PiRankingBold } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type ContestStatus = 'upcoming' | 'active' | 'completed' | 'draft';

interface Contest {
       id: string;
       title: string;
       category: 'traditional' | 'digital';
       status: ContestStatus;
       members: number;
       duration: string;
       startDate: string; 
       coverImage?: string;
}

export default function ManageContests() {
       const [contests, setContests] = useState<Contest[]>([
              {
                     id: '1',
                     title: 'Drawing Flowers Contest',
                     category: 'traditional',
                     status: 'active',
                     members: 139,
                     duration: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
                     startDate: new Date('2025-02-13T00:00:00').toISOString(),
                     coverImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
              },
              {
                     id: '2',
                     title: 'Drawing Cars using H2 Pencils',
                     category: 'digital',
                     status: 'upcoming',
                     members: 89,
                     duration: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
                     startDate: new Date('2025-02-13T00:00:00').toISOString(),
                     coverImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
              },
              {
                     id: '3',
                     title: 'Watercolor Landscapes',
                     category: 'traditional',
                     status: 'completed',
                     members: 215,
                     duration: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
                     startDate: new Date('2025-01-10T00:00:00').toISOString(),
                     coverImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
              }
       ]);

       const [editingContest, setEditingContest] = useState<Contest | null>(null);
       const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
       const [contestToDelete, setContestToDelete] = useState<string | null>(null);
       const [isAddModalOpen, setIsAddModalOpen] = useState(false);
       const [newContest, setNewContest] = useState<Omit<Contest, 'id'>>({
              title: '',
              category: 'traditional',
              status: 'draft',
              members: 0,
              duration: '',
              startDate: '',
              coverImage: ''
       });
       const [previewImage, setPreviewImage] = useState<string | null>(null);
       const [errors, setErrors] = useState<Record<string, string>>({});
       const fileInputRef = useRef<HTMLInputElement>(null);

       const statusColors = {
              upcoming: 'bg-yellow-500',
              active: 'bg-green-500',
              completed: 'bg-gray-500',
              draft: 'bg-blue-500'
       };


       function hoursBetween(date1: Date, date2: Date) {
              const diffInMs = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
              const diffInHours = diffInMs / (1000 * 60 * 60);
              return diffInHours;
       }

       const validateForm = (contest: Partial<Contest>) => {
              const newErrors: Record<string, string> = {};

              if (!contest.title?.trim()) {
                     newErrors.title = 'Title is required';
              }

              if (!contest.startDate) {
                     newErrors.startDate = 'Start date is required';
              }

              if (!contest.duration) {
                     newErrors.duration = 'Duration is required';
              } else if (new Date(contest.duration) <= new Date(contest.startDate || '')) {
                     newErrors.duration = 'Duration must be after start date';
              }

              if (!contest.coverImage) {
                     newErrors.coverImage = 'Cover image is required';
              }

              setErrors(newErrors);
              return Object.keys(newErrors).length === 0;
       };

       const handleDelete = (id: string) => {
              setContests(contests.filter(contest => contest.id !== id));
              setIsDeleteModalOpen(false);
       };

       const handleSaveEdit = () => {
              if (editingContest && validateForm(editingContest)) {
                     setContests(contests.map(contest =>
                            contest.id === editingContest.id ? editingContest : contest
                     ));
                     setEditingContest(null);
              }
       };

       const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, isNewContest: boolean) => {
              const file = e.target.files?.[0];
              if (file) {
                     const reader = new FileReader();
                     reader.onloadend = () => {
                            const imageUrl = reader.result as string;
                            setPreviewImage(imageUrl);
                            if (isNewContest) {
                                   setNewContest({ ...newContest, coverImage: imageUrl });
                            } else if (editingContest) {
                                   setEditingContest({ ...editingContest, coverImage: imageUrl });
                            }
                     };
                     reader.readAsDataURL(file);
              }
       };

       const handleAddContest = () => {
              if (validateForm(newContest)) {
                     setContests([...contests, {
                            ...newContest,
                            id: Math.random().toString(36).substring(2, 9),
                            members: Math.floor(Math.random() * 200) + 50,
                            coverImage: previewImage || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
                     }]);
                     setNewContest({
                            title: '',
                            category: 'traditional',
                            status: 'draft',
                            members: 0,
                            duration: '',
                            startDate: '',
                            coverImage: ''
                     });
                     setPreviewImage(null);
                     setIsAddModalOpen(false);
              }
       };

       const formatDate = (dateString: string) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              return isNaN(date.getTime()) ? dateString : date.toLocaleString('en-GB', {
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit'
              });
       };

       const calculateDuration = (startDate: string, endDate: string) => {
              if (!startDate || !endDate) return '';
              const start = new Date(startDate);
              const end = new Date(endDate);
              const diff = end.getTime() - start.getTime();
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              return `${hours}h ${minutes}m`;
       };

       const categoryIcons = {
              traditional: <FaPalette className="text-primary" />,
              digital: <FaDigitalTachograph className="text-accent" />
       };

       const sidebarItems: SidebarItem[] = [
              { title: 'Reports', active: false, path: '/dashboard/reports', icon: <TbMessageReport /> },
              { title: 'Users', active: false, path: '/dashboard/users', icon: <FiUsersIcon /> },
              { title: 'Contests', active: true, path: '/dashboard/contests', icon: <PiRankingBold /> },
              { title: 'Posts', active: false, path: '/dashboard/posts', icon: <TfiGallery /> },
              { title: 'Settings', active: false, path: '/dashboard/settings', icon: <FiSettings /> },
              { title: 'Log out', active: false, path: '/dashboard/logout', icon: <FiLogOut /> },
       ];

       return (
              <div className="flex min-h-screen w-full absolute bg-font pt-12 md:pt-0">
                     <Sidebar items={sidebarItems} />

                     <main className="flex-1 md:ml-64">
                            <div className="min-h-screen bg-gray-50 font-garet p-4 md:p-8">
                                   <div className="max-w-6xl mx-auto">
                                          {/* Header */}
                                          <div className="flex justify-between items-center mb-8">
                                                 <h1 className="text-3xl font-bold text-secondary">Manage Contests</h1>
                                                 <button
                                                        onClick={() => setIsAddModalOpen(true)}
                                                        className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg transition-colors"
                                                 >
                                                        <FiPlus /> Add Contest
                                                 </button>
                                          </div>

                                          {/* Contest Categories */}
                                          {['traditional', 'digital'].map(category => {
                                                 const categoryContests = contests.filter(
                                                        contest => contest.category === category
                                                 );

                                                 if (categoryContests.length === 0) return null;

                                                 return (
                                                        <div key={category} className="mb-12">
                                                               <div className="flex items-center gap-3 mb-4">
                                                                      {category === 'traditional' ? (
                                                                             <>
                                                                                    <FaPalette className="text-2xl text-primary" />
                                                                                    <h2 className="text-2xl font-semibold text-secondary">
                                                                                           Traditional Arts
                                                                                    </h2>
                                                                             </>
                                                                      ) : (
                                                                             <>
                                                                                    <FaDigitalTachograph className="text-2xl text-accent" />
                                                                                    <h2 className="text-2xl font-semibold text-secondary">
                                                                                           Digital Arts
                                                                                    </h2>
                                                                             </>
                                                                      )}
                                                               </div>

                                                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                      {categoryContests.map(contest => (
                                                                             <div
                                                                                    key={contest.id}
                                                                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                                                                             >
                                                                                    {/* Cover Image */}
                                                                                    <div className="h-40 relative overflow-hidden rounded-t-xl">
                                                                                           {contest.coverImage ? (
                                                                                                  <img
                                                                                                         src={contest.coverImage}
                                                                                                         alt={contest.title}
                                                                                                         className="w-full h-full object-cover"
                                                                                                  />
                                                                                           ) : (
                                                                                                  <div className="w-full h-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                                                                                                         <FiImage className="text-white text-4xl" />
                                                                                                  </div>
                                                                                           )}
                                                                                           <div className="absolute top-2 right-2">
                                                                                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[contest.status]} text-white`}>
                                                                                                         {contest.status}
                                                                                                  </span>
                                                                                           </div>
                                                                                    </div>

                                                                                    <div className="p-6">
                                                                                           <h3 className="text-xl font-bold text-secondary mb-4">
                                                                                                  {contest.title}
                                                                                           </h3>

                                                                                           <div className="space-y-3 text-gray-700">
                                                                                                  <div className="flex items-center gap-2">
                                                                                                         <FiCalendar className="text-primary" />
                                                                                                         <span>
                                                                                                                <strong>Starts:</strong> {formatDate(contest.startDate)}
                                                                                                         </span>
                                                                                                  </div>
                                                                                                  <div className="flex items-center gap-2">
                                                                                                         <FiCalendar className="text-primary" />
                                                                                                         <span>
                                                                                                                <strong>Ends:</strong> {formatDate(contest.duration)}
                                                                                                         </span>
                                                                                                  </div>
                                                                                                  <div className="flex items-center gap-2">
                                                                                                         <FiClock className="text-primary" />
                                                                                                         <span>
                                                                                                                <strong>Duration:</strong> {hoursBetween(new Date(contest.startDate), new Date(contest.duration)).toFixed()} hours
                                                                                                         </span>
                                                                                                  </div>
                                                                                                  <div className="flex items-center gap-2">
                                                                                                         <FiUsers className="text-primary" />
                                                                                                         <span>
                                                                                                                <strong>Members:</strong> {contest.members}
                                                                                                         </span>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </div>

                                                                                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
                                                                                           <button
                                                                                                  onClick={() => {
                                                                                                         setContestToDelete(contest.id);
                                                                                                         setIsDeleteModalOpen(true);
                                                                                                  }}
                                                                                                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                                                                           >
                                                                                                  <FiTrash2 /> Delete
                                                                                           </button>
                                                                                           <button
                                                                                                  onClick={() => {
                                                                                                         setEditingContest({ ...contest });
                                                                                                         setPreviewImage(contest.coverImage || null);
                                                                                                  }}
                                                                                                  className="text-primary hover:text-accent flex items-center gap-1"
                                                                                           >
                                                                                                  <FiEdit /> Edit
                                                                                           </button>
                                                                                    </div>
                                                                             </div>
                                                                      ))}
                                                               </div>
                                                        </div>
                                                 );
                                          })}
                                   </div>

                                   {/* Edit Modal */}
                                   {editingContest && (
                                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                 <div className="bg-white rounded-xl my-6 p-6 w-full max-w-md">
                                                        <h2 className="text-2xl font-bold text-secondary mb-4">Edit Contest</h2>

                                                        {/* Cover Image Upload */}
                                                        <div className="mb-4">
                                                               <label className="block text-gray-700 mb-2">Cover Image</label>
                                                               <div className="relative h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                                                                      {previewImage ? (
                                                                             <>
                                                                                    <img
                                                                                           src={previewImage}
                                                                                           alt="Preview"
                                                                                           className="w-full h-full object-cover"
                                                                                    />
                                                                                    <button
                                                                                           onClick={() => {
                                                                                                  setPreviewImage(null);
                                                                                                  setEditingContest({ ...editingContest, coverImage: '' });
                                                                                           }}
                                                                                           className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                                                    >
                                                                                           <FiX className="text-red-500" />
                                                                                    </button>
                                                                             </>
                                                                      ) : (
                                                                             <div
                                                                                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                                                                                    onClick={() => fileInputRef.current?.click()}
                                                                             >
                                                                                    <FiImage className="text-gray-400 text-3xl mb-2" />
                                                                                    <span className="text-gray-500">Click to upload image</span>
                                                                                    <input
                                                                                           type="file"
                                                                                           ref={fileInputRef}
                                                                                           onChange={(e) => handleImageUpload(e, false)}
                                                                                           className="hidden"
                                                                                           accept="image/*"
                                                                                    />
                                                                             </div>
                                                                      )}
                                                               </div>
                                                               {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
                                                        </div>

                                                        <div className="space-y-4">
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Title</label>
                                                                      <input
                                                                             type="text"
                                                                             value={editingContest.title}
                                                                             onChange={e => setEditingContest({ ...editingContest, title: e.target.value })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      />
                                                                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                                               </div>

                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Category</label>
                                                                      <select
                                                                             value={editingContest.category}
                                                                             onChange={e => setEditingContest({ ...editingContest, category: e.target.value as 'traditional' | 'digital' })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      >
                                                                             <option value="traditional">Traditional Arts</option>
                                                                             <option value="digital">Digital Arts</option>
                                                                      </select>
                                                               </div>

                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Status</label>
                                                                      <select
                                                                             value={editingContest.status}
                                                                             onChange={e => setEditingContest({ ...editingContest, status: e.target.value as ContestStatus })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      >
                                                                             <option value="draft">Draft</option>
                                                                             <option value="upcoming">Upcoming</option>
                                                                             <option value="active">Active</option>
                                                                             <option value="completed">Completed</option>
                                                                      </select>
                                                               </div>

                                                               {/* Start Date Picker */}
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Start Date & Time</label>
                                                                      <DatePicker
                                                                             selected={editingContest.startDate ? new Date(editingContest.startDate) : null}
                                                                             onChange={(date: Date | null) => date && setEditingContest({
                                                                                    ...editingContest,
                                                                                    startDate: date.toISOString()
                                                                             })}
                                                                             showTimeSelect
                                                                             timeFormat="HH:mm"
                                                                             timeIntervals={15}
                                                                             dateFormat="MMMM d, yyyy h:mm aa"
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                             minDate={new Date()}
                                                                      />
                                                                      {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                                                               </div>

                                                               {/* End Date Picker (Duration) */}
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">End Date & Time</label>
                                                                      <DatePicker
                                                                             selected={editingContest.duration ? new Date(editingContest.duration) : null}
                                                                             onChange={(date: Date | null) => date && setEditingContest({
                                                                                    ...editingContest,
                                                                                    duration: date.toISOString()
                                                                             })}
                                                                             showTimeSelect
                                                                             timeFormat="HH:mm"
                                                                             timeIntervals={15}
                                                                             dateFormat="MMMM d, yyyy h:mm aa"
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                             minDate={editingContest.startDate ? new Date(editingContest.startDate) : new Date()}
                                                                      />
                                                                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                                                      {editingContest.startDate && editingContest.duration && (
                                                                             <p className="text-sm text-gray-500 mt-1">
                                                                                    Duration: {calculateDuration(editingContest.startDate, editingContest.duration)}
                                                                             </p>
                                                                      )}
                                                               </div>
                                                        </div>

                                                        <div className="flex justify-end gap-3 mt-6">
                                                               <button
                                                                      onClick={() => setEditingContest(null)}
                                                                      className="px-4 py-2 border border-gray-300 rounded"
                                                               >
                                                                      Cancel
                                                               </button>
                                                               <button
                                                                      onClick={handleSaveEdit}
                                                                      className="px-4 py-2 bg-primary text-white rounded hover:bg-accent"
                                                               >
                                                                      Save Changes
                                                               </button>
                                                        </div>
                                                 </div>
                                          </div>
                                   )}

                                   {/* Delete Confirmation Modal */}
                                   {isDeleteModalOpen && (
                                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                 <div className="bg-white rounded-xl p-6 w-full max-w-md">
                                                        <h2 className="text-2xl font-bold text-secondary mb-4">Delete Contest</h2>
                                                        <p className="text-gray-700 mb-6">Are you sure you want to delete this contest? This action cannot be undone.</p>

                                                        <div className="flex justify-end gap-3">
                                                               <button
                                                                      onClick={() => setIsDeleteModalOpen(false)}
                                                                      className="px-4 py-2 border border-gray-300 rounded"
                                                               >
                                                                      Cancel
                                                               </button>
                                                               <button
                                                                      onClick={() => contestToDelete && handleDelete(contestToDelete)}
                                                                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                               >
                                                                      Delete
                                                               </button>
                                                        </div>
                                                 </div>
                                          </div>
                                   )}

                                   {/* Add Contest Modal */}
                                   {isAddModalOpen && (
                                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                                 <div className="bg-white rounded-xl p-6 w-full max-w-md">
                                                        <h2 className="text-2xl font-bold text-secondary mb-4">Add New Contest</h2>

                                                        {/* Cover Image Upload */}
                                                        <div className="mb-4">
                                                               <label className="block text-gray-700 mb-2">Cover Image</label>
                                                               <div className="relative h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                                                                      {previewImage ? (
                                                                             <>
                                                                                    <img
                                                                                           src={previewImage}
                                                                                           alt="Preview"
                                                                                           className="w-full h-full object-cover"
                                                                                    />
                                                                                    <button
                                                                                           onClick={() => {
                                                                                                  setPreviewImage(null);
                                                                                                  setNewContest({ ...newContest, coverImage: '' });
                                                                                           }}
                                                                                           className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                                                    >
                                                                                           <FiX className="text-red-500" />
                                                                                    </button>
                                                                             </>
                                                                      ) : (
                                                                             <div
                                                                                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                                                                                    onClick={() => fileInputRef.current?.click()}
                                                                             >
                                                                                    <FiImage className="text-gray-400 text-3xl mb-2" />
                                                                                    <span className="text-gray-500">Click to upload image</span>
                                                                                    <input
                                                                                           type="file"
                                                                                           ref={fileInputRef}
                                                                                           onChange={(e) => handleImageUpload(e, true)}
                                                                                           className="hidden"
                                                                                           accept="image/*"
                                                                                    />
                                                                             </div>
                                                                      )}
                                                               </div>
                                                               {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
                                                        </div>

                                                        <div className="space-y-4">
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Title</label>
                                                                      <input
                                                                             type="text"
                                                                             value={newContest.title}
                                                                             onChange={e => setNewContest({ ...newContest, title: e.target.value })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      />
                                                                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                                               </div>

                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Category</label>
                                                                      <select
                                                                             value={newContest.category}
                                                                             onChange={e => setNewContest({ ...newContest, category: e.target.value as 'traditional' | 'digital' })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      >
                                                                             <option value="traditional">Traditional Arts</option>
                                                                             <option value="digital">Digital Arts</option>
                                                                      </select>
                                                               </div>

                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Status</label>
                                                                      <select
                                                                             value={newContest.status}
                                                                             onChange={e => setNewContest({ ...newContest, status: e.target.value as ContestStatus })}
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                      >
                                                                             <option value="draft">Draft</option>
                                                                             <option value="upcoming">Upcoming</option>
                                                                             <option value="active">Active</option>
                                                                             <option value="completed">Completed</option>
                                                                      </select>
                                                               </div>

                                                               {/* Start Date Picker */}
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">Start Date & Time</label>
                                                                      <DatePicker
                                                                             selected={newContest.startDate ? new Date(newContest.startDate) : null}
                                                                             onChange={(date: Date | null) => date && setNewContest({
                                                                                    ...newContest,
                                                                                    startDate: date.toISOString()
                                                                             })}
                                                                             showTimeSelect
                                                                             timeFormat="HH:mm"
                                                                             timeIntervals={15}
                                                                             dateFormat="MMMM d, yyyy h:mm aa"
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                             minDate={new Date()}
                                                                      />
                                                                      {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                                                               </div>

                                                               {/* End Date Picker (Duration) */}
                                                               <div>
                                                                      <label className="block text-gray-700 mb-1">End Date & Time</label>
                                                                      <DatePicker
                                                                             selected={newContest.duration ? new Date(newContest.duration) : null}
                                                                             onChange={(date: Date | null) => date && setNewContest({
                                                                                    ...newContest,
                                                                                    duration: date.toISOString()
                                                                             })}
                                                                             showTimeSelect
                                                                             timeFormat="HH:mm"
                                                                             timeIntervals={15}
                                                                             dateFormat="MMMM d, yyyy h:mm aa"
                                                                             className="w-full p-2 border border-gray-300 rounded"
                                                                             minDate={newContest.startDate ? new Date(newContest.startDate) : new Date()}
                                                                      />
                                                                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                                                      {newContest.startDate && newContest.duration && (
                                                                             <p className="text-sm text-gray-500 mt-1">
                                                                                    Duration: {calculateDuration(newContest.startDate, newContest.duration)}
                                                                             </p>
                                                                      )}
                                                               </div>
                                                        </div>

                                                        <div className="flex justify-end gap-3 mt-6">
                                                               <button
                                                                      onClick={() => setIsAddModalOpen(false)}
                                                                      className="px-4 py-2 border border-gray-300 rounded"
                                                               >
                                                                      Cancel
                                                               </button>
                                                               <button
                                                                      onClick={handleAddContest}
                                                                      className="px-4 py-2 bg-primary text-white rounded hover:bg-accent"
                                                               >
                                                                      Add Contest
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