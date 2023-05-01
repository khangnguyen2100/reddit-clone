import Image from 'next/image';
import React from 'react';

import googleLogo from '/public/images/googlelogo.png';
import githubLogo from '/public/images/github-mark.png';

import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';

import { auth } from 'src/firebase/clientApp';
const OAuth = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  const className =
    'flex items-center rounded-3xl px-10 py-3 leading-none h-fit min-h-fit font-semibold border-solid border-[1px] transition-all duration-300 ease-in-out active:scale-[1.05]';
  return (
    <div>
      <div className='mb-7 flex w-full flex-col gap-y-3'>
        <button className={className} onClick={() => signInWithGoogle()}>
          <Image src={googleLogo} alt='google logo' width={20} height={20} />
          <p className='flex-1'>Sign in with Google</p>
        </button>
        <button className={className} onClick={() => signInWithGithub()}>
          <Image src={githubLogo} alt='github logo' width={20} height={20} />
          <p className='flex-1'>Sign in with Github</p>
        </button>
      </div>
      <fieldset className='my-5 border-t border-gray-300'>
        <legend className='bg-white px-3 text-center font-semibold text-gray-600'>
          OR
        </legend>
      </fieldset>
    </div>
  );
};

export default OAuth;