import Image from 'next/image';

import githubLogo from '/public/images/github-mark.png';
import googleLogo from '/public/images/googlelogo.png';
import redditLogo from '/public/images/redditFace.svg';

import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { uiSettingState } from 'src/atoms';
import { auth } from 'src/firebase/clientApp';
import useConfirm from 'src/hooks/useConfirm';
const OAuth = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);
  const setGuestModeState = useSetRecoilState(uiSettingState);
  const { ConfirmModal, confirmResult } = useConfirm({
    title: 'Sign in with Guest Mode',
    message:
      "Remember you're sign in with a fake email. You can't reset your password.",
  });

  const handleSignInWithGuestMode = async () => {
    const ans = await confirmResult();
    if (ans) {
      setGuestModeState(prev => ({
        ...prev,
        guestMode: true,
      }));
    }
  };
  const logoClassName =
    'absolute top-1/2 group-hover:left-8 transform -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out left-12';
  const className =
    'relative h-[46px] group flex items-center rounded-3xl px-10 py-3 leading-none font-semibold border-solid border-[1px] transition-all duration-300 ease-in-out active:scale-[1.05] shadow hover:scale-105';
  return (
    <div>
      <div className='mb-5 flex w-full flex-col gap-y-2'>
        <button className={className} onClick={() => signInWithGoogle()}>
          <Image
            src={googleLogo}
            className={logoClassName}
            alt='google logo'
            width={20}
            height={20}
          />
          <p className='flex-1'>Sign in with Google</p>
        </button>
        <button className={className} onClick={() => signInWithGithub()}>
          <Image
            src={githubLogo}
            alt='github logo'
            className={logoClassName}
            width={20}
            height={20}
          />
          <p className='flex-1'>Sign in with Github</p>
        </button>
        <button className={className} onClick={handleSignInWithGuestMode}>
          <Image
            src={redditLogo}
            className={logoClassName}
            alt='reddit logo'
            width={20}
            height={20}
          />
          <p className='flex-1'>Sign in with Guest Mode</p>
        </button>
      </div>
      <fieldset className='my-5 border-t border-gray-300'>
        <legend className='bg-white px-3 text-center font-semibold text-gray-600'>
          OR
        </legend>
      </fieldset>
      <ConfirmModal />
    </div>
  );
};

export default OAuth;
