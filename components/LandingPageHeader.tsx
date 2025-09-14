import { Icons } from '@/lib/icons/Icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ApplyTheme } from './ApplyTheme';
import { Contents } from './Landing';
import { LandingContentSheet } from './landing/Sheet';

interface Props {
  contents: Contents[];
  setHighLightedId: React.Dispatch<React.SetStateAction<string | null>>;
  divRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

const LandingPageHeader: React.FC<Props> = ({ contents, setHighLightedId, divRefs }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row dark:bg-black z-50 bg-white justify-between content-center items-center border-4 bg-gradient-to-bl fixed w-full">
      <div className="flex flex-row items-center justify-center content-center space-x-3">
        <LandingContentSheet contents={contents} setHighLightedId={setHighLightedId} divRefs={divRefs} />
        <div className="cursor-pointer bg-clip-padding">{Icons.appIcon()}</div>
        <ApplyTheme />
      </div>
      <div className="flex flex-row justify-between items-center space-x-3 ">
        <div className="font-bold shadow-accent-foreground hidden md:block">
          <Button
            variant={'outline'}
            className="text-white shadow accent-accent-foreground bg-linear-to-r from-blue-600 to-sky-400 "
            onClick={() => router.push('/auth/creator-signup')}
          >
            BECOME A CREATOR
          </Button>
        </div>
        <div className="">
          <Button variant={'outline'} onClick={() => router.push('/auth/login')}>
            LOGIN
          </Button>
        </div>
        <div className="font-bold">
          <Button variant={'default'} onClick={() => router.push('/auth/signup')}>
            SIGNUP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHeader;
