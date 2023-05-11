import type { IconType } from 'react-icons';
import { AiFillHome } from 'react-icons/ai';
import { atom } from 'recoil';

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  imageURL?: string;
};
const defaultMenuItems: DirectoryMenuItem = {
  displayText: 'Home',
  link: '/',
  icon: AiFillHome,
};

interface DirectoryMenu {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}
export const defaultState: DirectoryMenu = {
  isOpen: false,
  selectedMenuItem: defaultMenuItems,
};

export const directoryMenuState = atom<DirectoryMenu>({
  key: 'directoryMenuState',
  default: defaultState,
});
