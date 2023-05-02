import { Timestamp } from 'firebase/firestore';

export interface Communities {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  adultContent: boolean;
  createAt?: Timestamp;
  imageURL?: string;
}
