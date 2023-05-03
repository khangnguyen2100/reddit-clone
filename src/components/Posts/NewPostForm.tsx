import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImage } from 'react-icons/io5';
import {
  Timestamp,
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { Post } from 'src/atoms';
import { db, storage } from 'src/firebase/clientApp';

import { ImageUpload, TextInputs } from './PostsForm';
import TabItem from './TabItem';

export type TabItemProps = {
  title: string;
  icon: React.ElementType;
};
const formTabs: TabItemProps[] = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Image & Video',
    icon: IoImage,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  // {
  //   title: 'Talk',
  //   icon: BsMic,
  // },
];
type NewPostFormProps = {
  user: User;
};
const NewPostForm = ({ user }: NewPostFormProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<string>('');
  const handleCreatePost = async () => {
    setLoading(true);
    const communityId = router.query.communityId as string;
    const newPost: Post = {
      title: textInputs.title,
      body: textInputs.body,
      creatorId: user.uid || '',
      creatorDisplayName: user.displayName || user.email?.split('@')[0] || '',
      numberOfComments: 0,
      voteCount: 0,
      communityId,
      createdAt: serverTimestamp() as Timestamp,
    };
    try {
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);

      if (selectedFile) {
        // upload image to storage
        // save image with name "image" because is only 1 image here!. if you want implement multi image change image name
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');

        // adding image url link to post
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      setTextInputs({
        title: '',
        body: '',
      });
      setSelectedFile('');
      setLoading(false);
      // router.back();
    } catch (error) {
      console.log(`Error from handleCreatePost: ${error}`);
    }
  };
  const onSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = readerEvent => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextInputs(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className='mt-2 flex h-[450px] flex-col overflow-hidden rounded-md bg-sections-paper pb-2'>
      {/* tabs */}
      <div className='flex w-full'>
        {formTabs.map(tab => (
          <TabItem
            key={tab.title}
            item={tab}
            selected={selected === tab.title}
            setSelected={setSelected}
          />
        ))}
      </div>
      {selected === 'Post' && (
        <TextInputs
          textInputs={textInputs}
          onTextChange={onTextChange}
          loading={loading}
          onSave={handleCreatePost}
          disabled={!textInputs.title}
        />
      )}
      {selected === 'Image & Video' && (
        <ImageUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          onSelectedImage={onSelectedImage}
          setSelectedTab={setSelected}
        />
      )}
    </div>
  );
};

export default NewPostForm;
