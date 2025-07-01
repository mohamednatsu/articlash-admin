interface User {
       name: string,
       userName: string;
       userId: string;
       profileImageUrl: string;
       coverImageUrl: string | null;
       isActive: boolean;
       rank: string;
       showActive: boolean;
}

interface Media {
       url: string;
       mediaType: number;
       filename: string;
}

interface Mention {
       start: number;
       length: number;
       mentionedUserId: string;
       createdAt: string; // or Date if you parse it
}

export interface Post {
       id: string;
       title: string;
       description: string;
       tags: string;
       tools: string | null;
       preference: string;
       likes: number;
       comments: number;
       shares: number;
       createdAt: string; // or Date if you parse it
       user: User;
       media: Media[];
       mentions: Mention[];
       isLiked: boolean;
       sharedPost: Post | null;
}
