import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteCount: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};
interface PostVotes {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}
interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  postVotes: PostVotes[];
}

const defaultPostsState: PostState = {
  posts: [],
  selectedPost: null,
  postVotes: [],
};
export const postsState = atom<PostState>({
  key: 'postsState',
  default: defaultPostsState,
});
