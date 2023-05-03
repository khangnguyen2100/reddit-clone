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
interface PostState {
  posts: Post[];
  selectedPost: Post | null;
}

const defaultPostState: PostState = {
  posts: [],
  selectedPost: null,
};
export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState,
});
