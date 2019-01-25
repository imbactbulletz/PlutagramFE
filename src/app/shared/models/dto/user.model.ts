import {Post} from './post.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  profileImageUrl: string;
  online: boolean;

  followers: User[];
  following: User[];
  posts: Post[];
  sharedPosts: any;
}
