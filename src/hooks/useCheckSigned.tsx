import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from 'src/atoms';
import { auth } from 'src/firebase/clientApp';

const useCheckSigned = () => {
  const [user] = useAuthState(auth);
  const setAuthModal = useSetRecoilState(authModalState);
  const userSigned = () => {
    if (!user?.uid) {
      setAuthModal({
        open: true,
        view: 'login',
      });
      return false;
    }
    return true;
  };

  return {
    userSigned,
  };
};

export default useCheckSigned;
