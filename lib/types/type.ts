export interface StoryCircleProps {
  imageUrl: string;
  hasStory?: boolean;
  isLive?: boolean;
}

export interface User {
  name: string;
  title: string;
  avatar: string;
  time: string;
  isFollowing?: boolean;
  postText?: string;
}

export interface PostHeaderProps {
  user: User;
  isFollowing?: boolean;
}

export interface PostFooterProps {
  likes: string;
  comments: string;
  shares: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  salary: string;
  posted: string;
  description: string;
  isOnline?: boolean;
  isRemote?: boolean;
}

export interface ImageCarouselProps {
  activeIndex?: number;
  count?: number;
}

export interface PostCardProps {
  user: User;
  image: string;
  likes: string;
  comments: string;
  shares: string;
}

export interface GroupCardProps {
  group: Group;
}

export interface Group {
  name: string;
  category: string;
  image: string;
  mutuals: number;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  likes: string;
  comments: string;
  shares: string;
  isSharedPost?: {
    sharer: User;
  };
}

export interface Comment {
  id: string;
  name: string;
  avatar: string;
  text: string;
  timestamp: string;
  replies?: Comment[];
}

export interface CommentsModalProps {
  isVisible: boolean;
  onClose: () => void;
  comments: Comment[];
  onPostComment: (commentText: string, parentId?: string) => void;
}

export interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
}
