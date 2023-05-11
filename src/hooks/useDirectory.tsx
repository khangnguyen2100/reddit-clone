import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FaReddit } from 'react-icons/fa';

import { DirectoryMenuItem, directoryMenuState } from 'src/atoms/directoryAtom';

import useCommunityData from './useCommunityData';

const useDirectory = () => {
  const router = useRouter();
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);

  const { communityStateValue } = useCommunityData();
  const toggleDirectoryOpenMenu = () => {
    setDirectoryState(prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };
  const openDirectoryMenu = () => {
    setDirectoryState(prevState => ({
      ...prevState,
      isOpen: true,
    }));
  };
  const closeDirectoryMenu = () => {
    setDirectoryState(prevState => ({
      ...prevState,
      isOpen: false,
    }));
  };
  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState(prevState => ({
      ...prevState,
      selectedMenuItem: menuItem,
    }));
    router.push(`/${menuItem.link}`);
  };
  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    setDirectoryState(prev => ({
      ...prev,
      selectedMenuItem: {
        link: `r/${currentCommunity?.id}`,
        displayText: `r/${currentCommunity?.id}`,
        imageURL: currentCommunity?.imageURL,
        icon: FaReddit,
      } as DirectoryMenuItem,
    }));
  }, [communityStateValue.currentCommunity]);
  return {
    directoryState,
    setDirectoryState,
    toggleDirectoryOpenMenu,
    openDirectoryMenu,
    closeDirectoryMenu,
    onSelectMenuItem,
  };
};

export default useDirectory;
