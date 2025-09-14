import { useIsMobile } from '@/hooks/useIsMobile';
import { ArrowBigLeftDash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ReturnToPreviousPage: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  return (
    <Button variant={'outline'} size={'lg'} onClick={() => router.back()} className={className}>
      <ArrowBigLeftDash />
    </Button>
  );
};
