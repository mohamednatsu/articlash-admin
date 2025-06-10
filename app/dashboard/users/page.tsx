"use client";
import { useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight, FiMoreVertical, FiEdit, FiCheck, FiX } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function UserDashboard() {
       type BanStatus = "BannedFromChat" | "BannedFromPost" | "BannedFromInteract" | "BannedFromContest" | "FullBan";
       type UserStatus = "active" | BanStatus;

       interface User {
              id: number;
              name: string;
              date: string;
              status: UserStatus;
              avatar?: string;
              banReasons?: BanStatus[]; // For multiple ban reasons
       }

       // Generate random avatars using DiceBear API
       const generateAvatar = (seed: string) =>
              `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=5CE1E6`;

       const [users, setUsers] = useState<User[]>([
              { id: 1, name: "Khalid Khan", date: "3/4/2023", status: "active", avatar: generateAvatar("Khalid Khan") },
              { id: 2, name: "Essam Ali", date: "3/4/2023", status: "active", avatar: generateAvatar("Essam Ali") },
              { id: 3, name: "Mickel Alan", date: "3/4/2023", status: "active", avatar: generateAvatar("Mickel Alan") },
              { id: 4, name: "Walid Yahia", date: "3/4/2023", status: "active", avatar: generateAvatar("Walid Yahia") },
              { id: 5, name: "Khalid Khan", date: "3/4/2023", status: "active", avatar: generateAvatar("Khalid K") },
              {
                     id: 6,
                     name: "Sarah Ahmed",
                     date: "3/4/2023",
                     status: "BannedFromPost",
                     banReasons: ["BannedFromPost"],
                     avatar: generateAvatar("Sarah Ahmed")
              },
              { id: 7, name: "Mohammed Ali", date: "3/4/2023", status: "active", avatar: generateAvatar("Mohammed Ali") },
              { id: 8, name: "Khalid Khan", date: "3/4/2023", status: "active", avatar: generateAvatar("Khalid K") },
              {
                     id: 9,
                     name: "Sarah Ahmed",
                     date: "3/4/2023",
                     status: "FullBan",
                     banReasons: ["FullBan"],
                     avatar: generateAvatar("Sarah Ahmed")
              },
              { id: 10, name: "Mohammed Ali", date: "3/4/2023", status: "active", avatar: generateAvatar("Mohammed Ali") },
       ]);

       const [editingUserId, setEditingUserId] = useState<number | null>(null);
       const [editingBanReasons, setEditingBanReasons] = useState<BanStatus[]>([]);
       const [searchTerm, setSearchTerm] = useState("");
       const [currentPage, setCurrentPage] = useState(1);
       const usersPerPage = 7;

       const statusColors = {
              active: "bg-green-500",
              inactive: "bg-gray-500",
              pending: "bg-yellow-500",
              BannedFromChat: "bg-red-500",
              BannedFromPost: "bg-red-500",
              BannedFromInteract: "bg-red-500",
              BannedFromContest: "bg-red-500",
              FullBan: "bg-red-700",
       };

       const statusOptions: UserStatus[] = ["active"];
       const banOptions: BanStatus[] = ["BannedFromChat", "BannedFromPost", "BannedFromInteract", "BannedFromContest", "FullBan"];

       const handleStatusChange = (userId: number, newStatus: UserStatus) => {
              setUsers(users.map(user =>
                     user.id === userId ? { ...user, status: newStatus, banReasons: newStatus === "active" ? [] : user.banReasons } : user
              ));
              setEditingUserId(null);
       };

       const handleBanReasonsChange = (userId: number, reasons: BanStatus[]) => {
              setUsers(users.map(user =>
                     user.id === userId ? {
                            ...user,
                            status: reasons.length > 0 ? reasons[0] : "active", // Use first ban reason as status or default to active
                            banReasons: reasons
                     } : user
              ));
       };

       const startBanEditing = (user: User) => {
              setEditingUserId(user.id);
              setEditingBanReasons(user.banReasons || []);
       };

       const saveBanReasons = (userId: number) => {
              handleBanReasonsChange(userId, editingBanReasons);
              setEditingUserId(null);
       };

       const toggleBanReason = (reason: BanStatus) => {
              if (reason === "FullBan") {
                     setEditingBanReasons(["FullBan"]);
              } else if (editingBanReasons.includes("FullBan")) {
                     setEditingBanReasons([reason]);
              } else if (editingBanReasons.includes(reason)) {
                     setEditingBanReasons(editingBanReasons.filter(r => r !== reason));
              } else {
                     setEditingBanReasons([...editingBanReasons, reason]);
              }
       };

       const filteredUsers = users.filter(user =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
       );

       // Pagination logic
       const indexOfLastUser = currentPage * usersPerPage;
       const indexOfFirstUser = indexOfLastUser - usersPerPage;
       const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
       const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

       const formatStatusText = (status: UserStatus) => {
              return status
                     .replace(/([A-Z])/g, ' $1')
                     .replace(/^./, str => str.toUpperCase())
                     .trim();
       };

       return (
              <div className="flex min-h-screen w-full absolute bg-font pt-12 md:pt-0">
                     <main className="flex-1 md:ml-64 p-4 md:p-8">
                            <div className="max-w-6xl mx-auto">
                                   {/* Header */}
                                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                          <div>
                                                 <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                                                 <div className="flex items-center mt-2">
                                                        <span className="text-primary text-2xl font-bold mr-2">{users.length}</span>
                                                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                                                               +12 this week
                                                        </span>
                                                 </div>
                                          </div>

                                          {/* Search Bar */}
                                          <div className="relative w-full md:w-72">
                                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FiSearch className="h-5 w-5 text-gray-400" />
                                                 </div>
                                                 <input
                                                        type="text"
                                                        className="block w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400"
                                                        placeholder="Search user by name..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                 />
                                          </div>
                                   </div>

                                   {/* User List */}
                                   <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                                          {/* Table Header - Desktop */}
                                          <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-600">
                                                 <div className="col-span-4 flex items-center">
                                                        <span className="ml-2">User</span>
                                                 </div>
                                                 <div className="col-span-3 flex items-center">
                                                        <FaRegCalendarAlt className="mr-2" />
                                                        <span>Date Created</span>
                                                 </div>
                                                 <div className="col-span-3 flex items-center">
                                                        <span>Status</span>
                                                 </div>
                                                 <div className="col-span-2 text-right">Actions</div>
                                          </div>

                                          {/* User Items */}
                                          <div className="divide-y divide-gray-200">
                                                 {currentUsers.map((user) => (
                                                        <div
                                                               key={user.id}
                                                               className="grid grid-cols-1 md:grid-cols-12 p-4 hover:bg-gray-50 transition-colors items-center"
                                                        >
                                                               {/* User Name with Avatar */}
                                                               <div className="md:col-span-4 flex items-center mb-3 md:mb-0">
                                                                      <div className="mr-3">
                                                                             <img
                                                                                    src={user.avatar}
                                                                                    alt={user.name}
                                                                                    className="h-10 w-10 rounded-full object-cover border-2 border-primary/30"
                                                                             />
                                                                      </div>
                                                                      <div>
                                                                             <div className="font-medium text-gray-800">{user.name}</div>
                                                                             <div className="md:hidden text-xs text-gray-500 flex items-center mt-1">
                                                                                    <FaRegCalendarAlt className="mr-1" />
                                                                                    {user.date}
                                                                             </div>
                                                                      </div>
                                                               </div>

                                                               {/* Date - Hidden on mobile */}
                                                               <div className="hidden md:flex md:col-span-3 text-gray-500 items-center">
                                                                      {user.date}
                                                               </div>

                                                               {/* Status */}
                                                               <div className="md:col-span-3 flex items-center mb-3 md:mb-0">
                                                                      {editingUserId === user.id ? (
                                                                             <div className="flex flex-col gap-2">
                                                                                    <select
                                                                                           defaultValue={user.status}
                                                                                           onChange={(e) => handleStatusChange(user.id, e.target.value as UserStatus)}
                                                                                           className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                                                    >
                                                                                           {statusOptions.map((option) => (
                                                                                                  <option key={option} value={option}>
                                                                                                         {option.charAt(0).toUpperCase() + option.slice(1)}
                                                                                                  </option>
                                                                                           ))}
                                                                                           <option value="BannedFromChat">Banned (Custom)</option>
                                                                                    </select>
                                                                                    {user.status !== "active" && (
                                                                                           <Popover>
                                                                                                  <PopoverTrigger className="text-xs text-primary hover:underline">
                                                                                                         {editingBanReasons.length > 0
                                                                                                                ? `${editingBanReasons.length} ban reasons selected`
                                                                                                                : "Select ban reasons"}
                                                                                                  </PopoverTrigger>
                                                                                                  <PopoverContent className="w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
                                                                                                         <div className="space-y-3">
                                                                                                                {banOptions.map((option) => (
                                                                                                                       <div key={option} className="flex items-center space-x-2">
                                                                                                                              <Checkbox
                                                                                                                                     id={`${user.id}-${option}`}
                                                                                                                                     checked={editingBanReasons.includes(option)}
                                                                                                                                     onChange={() => toggleBanReason(option)}
                                                                                                                              />
                                                                                                                              <Label htmlFor={`${user.id}-${option}`} className="text-sm">
                                                                                                                                     {formatStatusText(option)}
                                                                                                                              </Label>
                                                                                                                       </div>
                                                                                                                ))}
                                                                                                         </div>
                                                                                                  </PopoverContent>
                                                                                           </Popover>
                                                                                    )}
                                                                             </div>
                                                                      ) : (
                                                                             <>
                                                                                    <span className={`w-2 h-2 rounded-full ${statusColors[user.status]} mr-2`}></span>
                                                                                    <div className="flex flex-col">
                                                                                           <span className="capitalize text-gray-700">
                                                                                                  {formatStatusText(user.status)}
                                                                                           </span>
                                                                                           {user.banReasons && user.banReasons.length > 1 && (
                                                                                                  <span className="text-xs text-gray-500">
                                                                                                         +{user.banReasons.length - 1} more restrictions
                                                                                                  </span>
                                                                                           )}
                                                                                    </div>
                                                                             </>
                                                                      )}
                                                               </div>

                                                               {/* Actions */}
                                                               <div className="md:col-span-2 flex justify-end items-center">
                                                                      {editingUserId === user.id ? (
                                                                             <div className="flex">
                                                                                    <button
                                                                                           onClick={() => saveBanReasons(user.id)}
                                                                                           className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium mr-2 flex items-center"
                                                                                    >
                                                                                           <FiCheck className="mr-1" /> Save
                                                                                    </button>
                                                                                    <button
                                                                                           onClick={() => setEditingUserId(null)}
                                                                                           className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center"
                                                                                    >
                                                                                           <FiX className="mr-1" /> Cancel
                                                                                    </button>
                                                                             </div>
                                                                      ) : (
                                                                             <button
                                                                                    onClick={() => startBanEditing(user)}
                                                                                    className="px-3 py-1.5 bg-accent hover:bg-primary text-white rounded-lg transition-colors text-sm font-medium mr-2 flex items-center"
                                                                             >
                                                                                    <FiEdit className="mr-1" /> Edit
                                                                             </button>
                                                                      )}
                                                                      
                                                               </div>
                                                        </div>
                                                 ))}
                                          </div>
                                   </div>

                                   {/* Pagination */}
                                   <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                                          <div className="text-gray-500 text-sm">
                                                 Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
                                          </div>
                                          <div className="flex items-center space-x-2">
                                                 <button
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                                                 >
                                                        <FiChevronLeft />
                                                 </button>

                                                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                        let pageNum;
                                                        if (totalPages <= 5) {
                                                               pageNum = i + 1;
                                                        } else if (currentPage <= 3) {
                                                               pageNum = i + 1;
                                                        } else if (currentPage >= totalPages - 2) {
                                                               pageNum = totalPages - 4 + i;
                                                        } else {
                                                               pageNum = currentPage - 2 + i;
                                                        }

                                                        return (
                                                               <button
                                                                      key={pageNum}
                                                                      onClick={() => setCurrentPage(pageNum)}
                                                                      className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                                               >
                                                                      {pageNum}
                                                               </button>
                                                        );
                                                 })}

                                                 {totalPages > 5 && currentPage < totalPages - 2 && (
                                                        <span className="px-2">...</span>
                                                 )}

                                                 {totalPages > 5 && currentPage < totalPages - 2 && (
                                                        <button
                                                               onClick={() => setCurrentPage(totalPages)}
                                                               className={`w-10 h-10 rounded-lg ${currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                                                        >
                                                               {totalPages}
                                                        </button>
                                                 )}

                                                 <button
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                        disabled={currentPage === totalPages}
                                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                                                 >
                                                        <FiChevronRight />
                                                 </button>
                                          </div>
                                   </div>
                            </div>
                     </main>
              </div>
       );
}