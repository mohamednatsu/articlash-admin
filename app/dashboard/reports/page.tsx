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
import { FaComments, FaDrawPolygon, FaImages, FaRegFlag } from "react-icons/fa";
import Link from 'next/link';

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
                     status: 'pending',
                     comment: {
                            id: 1,
                            text: 'This seems like a valid complaint. Let\'s review the content.',
                            createdAt: '2025-02-02T10:30:00',
                     }
              },
              {
                     id: 13,
                     reportingUser: 'Sarah Mohamed',
                     reportedUser: 'John Doe',
                     date: 'Mon - 1/2/2025',
                     reason: 'Inappropriate content violating community guidelines.',
                     postId: '48921abc-f45b-3007-b18d-55f5844bcdde',
                     status: 'pending',
                     comment: {
                            id: 1,
                            text: 'I\'ve checked the post and it does violate our guidelines.',
                            createdAt: '2025-02-02T10:30:00',
                     }
              },
              {
                     id: 14,
                     reportingUser: 'Ali Hassan',
                     reportedUser: 'Emma Wilson',
                     date: 'Sun - 31/1/2025',
                     reason: 'Copyright infringement of artistic work.',
                     postId: '55673efg-h78c-2008-c29e-66g6955deff',
                     status: 'pending',
                     comment: {
                            id: 1,
                            text: 'This seems like a valid complaint. Let\'s review the content.',
                            createdAt: '2025-02-02T10:30:00',
                     }
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
                            </div>

                            <div className="flex md:flex-row flex-col justify-center md:gap-20 gap-8 items-center md:h-[100px] h-[200px] mt-10 md:mt-0">
                                   <Link href="/dashboard/reports/posts" className="bg-primary px-6 py-3 rounded-lg text-white font-bold md:w-1/4 w-1/2 text-center h-1/2 md:text-xl flex justify-center items-center text-lg shadow-md hover:translate-y-[-3px] transition-all cursor-pointer">
                                          Posts Reports
                                   </Link>

                                   <Link href={"/dashboard/reports/comments"} className="bg-secondary px-6 py-3 rounded-lg text-white font-bold md:w-1/4 w-1/2 text-center h-1/2 md:text-xl flex justify-center items-center text-lg shadow-md hover:translate-y-[-3px] transition-all cursor-pointer">
                                          Comments Reports
                                   </Link>
                            </div>


                            <div className="flex justify-center flex-col items-start md:ml-20 mt-12 h-[200px]">
                                   <div className="flex justify-start items-center gap-2">
                                          <h2 className='font-bold md:text-3xl text-xl text-primary'>Number of Reports:</h2>
                                          <span className='md:text-2xl text-lg text-secondary'>30 Reports</span>
                                   </div>

                                   <div className="flex flex-col mt-10 gap-6">
                                          <div className="flex justify-start items-center gap-2">
                                                 <FaImages className="text-secondary/90 md:text-[30px] text-[20px]" />
                                                 <h2 className='font-bold md:text-2xl text-xl text-secondary/90'>Posts Reports:</h2>
                                                 <span className='md:text-xl text-lg text-black/80'>20 Reports</span>
                                          </div>
                                          <div className="flex justify-start items-center gap-2">
                                                 <FaComments className="text-secondary/90 md:text-[30px] text-[20px]" />
                                                 <h2 className='font-bold md:text-2xl text-xl text-secondary/90'>Comments Reports:</h2>
                                                 <span className='md:text-xl text-lg text-black/80'>10 Reports</span>
                                          </div>
                                   </div>
                            </div>

                     </motion.main>
              </div>
       );
};

export default ReportsPage;