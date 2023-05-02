import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Communities {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  adultContent: boolean;
  createAt?: Timestamp;
  imageURL?: string;
}
export interface CommunityModalState {
  open: boolean;
}
const defaultState: CommunityModalState = {
  open: false,
};
export const communityModalState = atom<CommunityModalState>({
  key: 'communityModalState',
  default: defaultState,
});
