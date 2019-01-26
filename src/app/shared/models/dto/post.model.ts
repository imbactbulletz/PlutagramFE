export class Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  totalLikes: number;
  totalComments: number;
  comments: Comment[];
  likes: any[];
  shared: boolean;
}
