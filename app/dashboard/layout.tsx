"use client";

import Sidebar from '@/components/Sidebar';
import { SidebarItem } from '@/types';
import React from 'react'

import { ReactNode } from 'react';
import { TbMessageReport } from "react-icons/tb";
import { FiLogOut, FiSettings, FiUsers as FiUsersIcon } from "react-icons/fi";
import { PiRankingBold } from "react-icons/pi";
import { TfiGallery } from "react-icons/tfi";
import { usePathname } from 'next/navigation';


export default function DashboardLayout({ children }: { children: ReactNode }) {

       const pathname = usePathname();

       const sidebarItems: SidebarItem[] = [
              { title: 'Reports', active: pathname.startsWith('/dashboard/reports'), path: '/dashboard/reports', icon: <TbMessageReport /> },
              { title: 'Users', active: pathname.startsWith('/dashboard/users'), path: '/dashboard/users', icon: <FiUsersIcon /> },
              { title: 'Contests', active: pathname.startsWith('/dashboard/contests'), path: '/dashboard/contests', icon: <PiRankingBold /> },
              { title: 'Posts', active: pathname.startsWith('/dashboard/posts'), path: '/dashboard/posts', icon: <TfiGallery /> },
              { title: 'Settings', active: pathname.startsWith('/dashboard/settings'), path: '/dashboard/settings', icon: <FiSettings /> },
              { title: 'Log out', active: pathname.startsWith('/dashboard/logout'), path: '/dashboard/logout', icon: <FiLogOut /> },
       ];
       return (
              <div>
                     {/* Add your global layout components here */}
                     {/* For example, a sidebar or header */}
                     <Sidebar items={sidebarItems} />
                     {/* Sidebar and Header components can be added here */}
                     {children}
              </div>
       )
}
