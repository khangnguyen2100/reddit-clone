import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  adultContent: boolean;
  createAt?: Timestamp;
  imageURL?: string;
}
interface CommunityModalState {
  open: boolean;
}
const defaultModalState: CommunityModalState = {
  open: false,
};
export const communityModalState = atom<CommunityModalState>({
  key: 'communityModalState',
  default: defaultModalState,
});
export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
interface CommunityState {
  mySnippets?: CommunitySnippet[];
  currentCommunity?: Community;
  snippetsFetch: boolean;
}
const defaultState: CommunityState = {
  mySnippets: [],
  snippetsFetch: false,
};
export const communityState = atom<CommunityState>({
  key: 'communityState',
  default: defaultState,
});
