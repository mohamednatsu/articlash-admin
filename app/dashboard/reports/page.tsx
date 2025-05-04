"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Report, SidebarItem } from '@/types';
import {
       TbMessageReport,
       TbCheck,
       TbX,
       TbEye,
       TbUser,
       TbCalendar,
       TbFileDescription,
       TbId,
       TbMessage
} from "react-icons/tb";
import { FaRegFlag } from "react-icons/fa";

interface Comment {
       id: number;
       text: string;
       createdAt: string;
       adminId: number;
       reportId: number;
}

const ReportsPage = () => {
       const [reports, setReports] = useState<Report[]>([
              {
                     id: 12,
                     reportingUser: 'Ahmed Ali Essam',
                     reportedUser: 'Mark Sam',
                     date: 'Tue - 2/2/2025',
                     reason: 'He posted a picture that offends a famous Islamic figure.',
                     postId: '33722dbc-e63a-4006-a17c-44f4833added',
                     status: 'pending'
              },
              {
                     id: 13,
                     reportingUser: 'Sarah Mohamed',
                     reportedUser: 'John Doe',
                     date: 'Mon - 1/2/2025',
                     reason: 'Inappropriate content violating community guidelines.',
                     postId: '48921abc-f45b-3007-b18d-55f5844bcdde',
                     status: 'pending'
              },
              {
                     id: 14,
                     reportingUser: 'Ali Hassan',
                     reportedUser: 'Emma Wilson',
                     date: 'Sun - 31/1/2025',
                     reason: 'Copyright infringement of artistic work.',
                     postId: '55673efg-h78c-2008-c29e-66g6955deff',
                     status: 'pending'
              }
       ]);

       const [comments, setComments] = useState<Record<number, Comment[]>>({});
       const [newComment, setNewComment] = useState('');
       const [selectedReport, setSelectedReport] = useState<Report | null>(null);
       const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
       const [searchTerm, setSearchTerm] = useState('');
       const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');
       const [showCommentModal, setShowCommentModal] = useState(false);
       const [currentReportId, setCurrentReportId] = useState<number | null>(null);

       // Simulate fetching comments for a report
       const fetchComments = async (reportId: number) => {
              // In a real app, you would fetch from your API
              const mockComments: Comment[] = [
                     {
                            id: 1,
                            text: 'This seems like a valid complaint. Let\'s review the content.',
                            createdAt: '2025-02-02T10:30:00',
                            adminId: 1,
                            reportId: reportId
                     },
                     {
                            id: 2,
                            text: 'I\'ve checked the post and it does violate our guidelines.',
                            createdAt: '2025-02-02T11:15:00',
                            adminId: 2,
                            reportId: reportId
                     }
              ];
              setComments(prev => ({ ...prev, [reportId]: mockComments }));
       };

       // Handle adding a new comment
       const handleAddComment = async () => {
              if (!newComment.trim() || !currentReportId) return;

              // In a real app, you would POST to your API
              const newCommentObj: Comment = {
                     id: Date.now(), // Temporary ID
                     text: newComment,
                     createdAt: new Date().toISOString(),
                     adminId: 1, // This would be the logged-in admin's ID
                     reportId: currentReportId
              };

              setComments(prev => ({
                     ...prev,
                     [currentReportId]: [...(prev[currentReportId] || []), newCommentObj]
              }));

              // Here you would call your API to save the comment
              try {
                     // await fetch('/api/reports/comments', {
                     //   method: 'POST',
                     //   headers: {
                     //     'Content-Type': 'application/json',
                     //   },
                     //   body: JSON.stringify({
                     //     reportId: currentReportId,
                     //     text: newComment
                     //   })
                     // });
                     console.log('Comment submitted:', newCommentObj);
              } catch (error) {
                     console.error('Error submitting comment:', error);
              }

              setNewComment('');
              setShowCommentModal(false);
       };

       const filteredReports = reports.filter(report => {
              const matchesSearch = report.reportingUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     report.postId.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
              return matchesSearch && matchesStatus;
       });

       const handleReportAction = (reportId: number, action: 'approve' | 'reject') => {
              setReports(reports.map(report =>
                     report.id === reportId ? { ...report, status: action === 'approve' ? 'resolved' : 'rejected' } : report
              ));
              setSelectedReport(null);
              setActionType(null);
       };

       const getStatusColor = (status: string) => {
              switch (status) {
                     case 'pending': return 'bg-yellow-100 text-yellow-800';
                     case 'resolved': return 'bg-green-100 text-green-800';
                     case 'rejected': return 'bg-red-100 text-red-800';
                     default: return 'bg-gray-100 text-gray-800';
              }
       };

       const openCommentModal = (reportId: number) => {
              setCurrentReportId(reportId);
              setShowCommentModal(true);
              if (!comments[reportId]) {
                     fetchComments(reportId);
              }
       };

       return (
              <div className="flex min-h-screen w-full bg-gray-50 pt-12 md:pt-0">
                     <motion.main
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 md:ml-64 p-6 md:p-8"
                     >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                   <div>
                                          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Report Management</h1>
                                          <p className="text-gray-600">Review and take action on user reports</p>
                                   </div>

                                   <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                          <div className="relative flex-1 md:w-64">
                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <TbMessageReport className="text-gray-400" />
                                                 </div>
                                                 <input
                                                        type="text"
                                                        placeholder="Search reports..."
                                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                 />
                                          </div>

                                          <div className="relative w-full md:w-48">
                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaRegFlag className="text-gray-400" />
                                                 </div>
                                                 <select
                                                        className="appearance-none w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                                                        value={filterStatus}
                                                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'resolved')}
                                                 >
                                                        <option value="all">All Reports</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="resolved">Resolved</option>
                                                 </select>
                                          </div>
                                   </div>
                            </div>

                            <div className="space-y-6">
                                   {filteredReports.length === 0 ? (
                                          <div className="text-center py-12">
                                                 <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                        <TbMessageReport className="text-primary text-3xl" />
                                                 </div>
                                                 <h3 className="text-lg font-medium text-gray-800 mb-1">No reports found</h3>
                                                 <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                          </div>
                                   ) : (
                                          <AnimatePresence>
                                                 {filteredReports.map((report) => (
                                                        <motion.div
                                                               key={report.id}
                                                               initial={{ opacity: 0, y: 20 }}
                                                               animate={{ opacity: 1, y: 0 }}
                                                               exit={{ opacity: 0, y: -20 }}
                                                               transition={{ duration: 0.3 }}
                                                               className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                                                        >
                                                               <div className="p-6">
                                                                      <div className="flex justify-between items-start mb-4">
                                                                             <div className="flex items-center gap-3">
                                                                                    <div className="bg-primary/10 p-2 rounded-lg">
                                                                                           <TbMessageReport className="text-primary text-xl" />
                                                                                    </div>
                                                                                    <h2 className="text-xl font-bold text-gray-800">Report #{report.id}</h2>
                                                                             </div>
                                                                             <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status || 'pending')}`}>
                                                                                    {(report.status ?? 'pending').charAt(0).toUpperCase() + (report.status ?? 'pending').slice(1)}
                                                                             </span>
                                                                      </div>

                                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                                             <div className="bg-gray-50 p-4 rounded-lg">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                           <TbUser className="text-primary" />
                                                                                           <h3 className="font-medium text-gray-800">Reporting User</h3>
                                                                                    </div>
                                                                                    <p className="text-gray-600">{report.reportingUser}</p>
                                                                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                                                           <TbCalendar className="text-gray-400" />
                                                                                           <span>{report.date}</span>
                                                                                    </div>
                                                                             </div>

                                                                             <div className="bg-gray-50 p-4 rounded-lg">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                           <TbUser className="text-primary" />
                                                                                           <h3 className="font-medium text-gray-800">Reported User</h3>
                                                                                    </div>
                                                                                    <p className="text-gray-600">{report.reportedUser}</p>
                                                                             </div>

                                                                             <div className="bg-gray-50 p-4 rounded-lg">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                           <TbFileDescription className="text-primary" />
                                                                                           <h3 className="font-medium text-gray-800">Reason</h3>
                                                                                    </div>
                                                                                    <p className="text-gray-600">{report.reason}</p>
                                                                             </div>
                                                                      </div>

                                                                      {/* Comments preview (show last comment if exists) */}
                                                                      {comments[report.id]?.length > 0 && (
                                                                             <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                                                                                    <div className="flex items-center gap-2 mb-2">
                                                                                           <TbMessage className="text-primary" />
                                                                                           <h3 className="font-medium text-gray-800">Latest Comment</h3>
                                                                                    </div>
                                                                                    <p className="text-gray-600 line-clamp-2">
                                                                                           {comments[report.id][comments[report.id].length - 1].text}
                                                                                    </p>
                                                                             </div>
                                                                      )}

                                                                      <div className="mt-6 flex flex-wrap gap-3">
                                                                             {report.status === 'pending' && (
                                                                                    <>
                                                                                           <motion.button
                                                                                                  whileHover={{ scale: 1.03 }}
                                                                                                  whileTap={{ scale: 0.97 }}
                                                                                                  onClick={() => {
                                                                                                         setSelectedReport(report);
                                                                                                         setActionType('approve');
                                                                                                  }}
                                                                                                  className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium flex items-center gap-2"
                                                                                           >
                                                                                                  <TbCheck /> Approve
                                                                                           </motion.button>
                                                                                           <motion.button
                                                                                                  whileHover={{ scale: 1.03 }}
                                                                                                  whileTap={{ scale: 0.97 }}
                                                                                                  onClick={() => {
                                                                                                         setSelectedReport(report);
                                                                                                         setActionType('reject');
                                                                                                  }}
                                                                                                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium flex items-center gap-2"
                                                                                           >
                                                                                                  <TbX /> Reject
                                                                                           </motion.button>
                                                                                    </>
                                                                             )}
                                                                             <motion.button
                                                                                    whileHover={{ scale: 1.03 }}
                                                                                    whileTap={{ scale: 0.97 }}
                                                                                    onClick={() => openCommentModal(report.id)}
                                                                                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2"
                                                                             >
                                                                                    <TbMessage /> {comments[report.id]?.length ? 'View Comments' : 'Add Comment'}
                                                                             </motion.button>
                                                                             <motion.button
                                                                                    whileHover={{ scale: 1.03 }}
                                                                                    whileTap={{ scale: 0.97 }}
                                                                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium flex items-center gap-2"
                                                                             >
                                                                                    <TbEye /> View Post
                                                                             </motion.button>
                                                                      </div>
                                                               </div>
                                                        </motion.div>
                                                 ))}
                                          </AnimatePresence>
                                   )}
                            </div>

                            {/* Action Confirmation Modal */}
                            <AnimatePresence>
                                   {selectedReport && actionType && (
                                          <motion.div
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 exit={{ opacity: 0 }}
                                                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                                          >
                                                 <motion.div
                                                        initial={{ scale: 0.9 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0.9 }}
                                                        className="bg-white rounded-xl p-6 w-full max-w-md"
                                                 >
                                                        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                                                               {actionType === 'approve' ? (
                                                                      <TbCheck className="text-green-500 text-3xl" />
                                                               ) : (
                                                                      <TbX className="text-red-500 text-3xl" />
                                                               )}
                                                        </div>
                                                        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                                                               {actionType === 'approve' ? 'Approve Report' : 'Reject Report'}
                                                        </h2>
                                                        <p className="text-gray-600 text-center mb-6">
                                                               Are you sure you want to {actionType} this report? This action will mark it as {actionType === 'approve' ? 'resolved' : 'rejected'}.
                                                        </p>

                                                        <div className="flex justify-center gap-4">
                                                               <motion.button
                                                                      whileHover={{ scale: 1.03 }}
                                                                      whileTap={{ scale: 0.97 }}
                                                                      onClick={() => {
                                                                             setSelectedReport(null);
                                                                             setActionType(null);
                                                                      }}
                                                                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                                               >
                                                                      Cancel
                                                               </motion.button>
                                                               <motion.button
                                                                      whileHover={{ scale: 1.03 }}
                                                                      whileTap={{ scale: 0.97 }}
                                                                      onClick={() => handleReportAction(selectedReport.id, actionType)}
                                                                      className={`px-6 py-2 ${actionType === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg transition-colors flex items-center gap-2`}
                                                               >
                                                                      {actionType === 'approve' ? (
                                                                             <>
                                                                                    <TbCheck /> Approve
                                                                             </>
                                                                      ) : (
                                                                             <>
                                                                                    <TbX /> Reject
                                                                             </>
                                                                      )}
                                                               </motion.button>
                                                        </div>
                                                 </motion.div>
                                          </motion.div>
                                   )}
                            </AnimatePresence>

                            {/* Comment Modal */}
                            <AnimatePresence>
                                   {showCommentModal && currentReportId && (
                                          <motion.div
                                                 initial={{ opacity: 0 }}
                                                 animate={{ opacity: 1 }}
                                                 exit={{ opacity: 0 }}
                                                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                                          >
                                                 <motion.div
                                                        initial={{ scale: 0.9 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0.9 }}
                                                        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] flex flex-col"
                                                 >
                                                        <div className="flex justify-between items-center mb-4">
                                                               <h2 className="text-xl font-bold text-gray-800">Comments</h2>
                                                               <button
                                                                      onClick={() => setShowCommentModal(false)}
                                                                      className="text-gray-500 hover:text-gray-700"
                                                               >
                                                                      <TbX className="text-2xl" />
                                                               </button>
                                                        </div>

                                                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                                                               {comments[currentReportId]?.length ? (
                                                                      comments[currentReportId].map(comment => (
                                                                             <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                                                                    <div className="flex justify-between items-start mb-1">
                                                                                           <span className="text-sm font-medium text-gray-700">Admin #{comment.adminId}</span>
                                                                                           <span className="text-xs text-gray-500">
                                                                                                  {new Date(comment.createdAt).toLocaleString()}
                                                                                           </span>
                                                                                    </div>
                                                                                    <p className="text-gray-600">{comment.text}</p>
                                                                             </div>
                                                                      ))
                                                               ) : (
                                                                      <p className="text-gray-500 text-center py-4">No comments yet</p>
                                                               )}
                                                        </div>

                                                        <div className="border-t pt-4">
                                                               <textarea
                                                                      value={newComment}
                                                                      onChange={(e) => setNewComment(e.target.value)}
                                                                      placeholder="Add a comment..."
                                                                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3"
                                                                      rows={3}
                                                               />
                                                               <div className="flex justify-end gap-3">
                                                                      <button
                                                                             onClick={() => setShowCommentModal(false)}
                                                                             className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                                                      >
                                                                             Cancel
                                                                      </button>
                                                                      <button
                                                                             onClick={handleAddComment}
                                                                             className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                                                                             disabled={!newComment.trim()}
                                                                      >
                                                                             Post Comment
                                                                      </button>
                                                               </div>
                                                        </div>
                                                 </motion.div>
                                          </motion.div>
                                   )}
                            </AnimatePresence>
                     </motion.main>
              </div>
       );
};

export default ReportsPage;