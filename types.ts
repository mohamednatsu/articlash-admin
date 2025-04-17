// types.ts
export interface Report {
       id: number;
       reportingUser: string;
       reportedUser: string;
       date: string;
       reason: string;
       postId: string;
       status?: 'pending' | 'resolved' | 'rejected';
}

export interface SidebarItem {
       title: string;
       active: boolean;
       path: string;
       icon?: React.ReactNode;
}

export type ContestStatus = 'upcoming' | 'active' | 'completed' | 'draft';


export interface Contest {
       id: string;
       title: string;
       category: 'traditional' | 'digital';
       status: ContestStatus;
       members: number;
       duration: string;
       startDate: string;
       cover: string;
}