'use client';

import {
  CircleDollarSign,
  Gem,
  LoaderIcon,
  LucideIcon,
  MessageCircle,
  NetworkIcon,
  ShieldQuestionMark,
  TableOfContents,
  UserRoundCheck
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense, useRef, useState } from 'react';
import { Vortex } from './ui/shadcn-io/vortex';

export interface Contents {
  label: string;
  icon: LucideIcon;
  id: string;
}

const LandingPageContent = dynamic(() => import('@/components/landing/Content'), { ssr: false });
const LandingPageHeader = dynamic(() => import('@/components/landing/Header'), { ssr: false });
const LandingPagePricing = dynamic(() => import('@/components/landing/Pricing'), { ssr: false });
const LandingPageFooter = dynamic(() => import('@/components/landing/Footer'), { ssr: false });

const contents: Contents[] = [
  { label: 'How It Works?', icon: NetworkIcon, id: '1' },
  { label: 'Why PayView?', icon: ShieldQuestionMark, id: '2' },
  { label: 'For Creators', icon: Gem, id: '3' },
  { label: 'For Viewers', icon: UserRoundCheck, id: '4' },
  { label: 'What People Say?', icon: MessageCircle, id: '5' },
  { label: 'Pricing plans', icon: CircleDollarSign, id: '6' },
  { label: 'FAQ', icon: TableOfContents, id: '8' }
];

export const LandingPage = () => {
  const [highLightedId, setHighLightedId] = useState<string | null>(null);
  const divRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <Suspense fallback={<LoaderIcon className="animate-spin" />}>
      <div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Vortex backgroundColor={'#000'} rangeY={800} particleCount={500} baseHue={120} />
        </div>
        <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">
          <LandingPageHeader contents={contents} setHighLightedId={setHighLightedId} divRefs={divRefs} />
          <LandingPageContent highLightedId={highLightedId} divRefs={divRefs} />
          <LandingPagePricing highLightedId={highLightedId} divRefs={divRefs} />
          <LandingPageFooter />
        </div>
      </div>
    </Suspense>
  );
};
