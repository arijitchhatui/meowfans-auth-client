'use client';

import { Card, CardContent } from '@/components/ui/card';
import { RetroGrid } from '@/components/ui/shadcn-io/retro-grid';
import useAPI from '@/hooks/useAPI';
import { AppSizes, AuthPaths, CreatorSignupInput, LoginInput, SignupInput, UserRoles } from '@/lib/constants';
import { Icons } from '@/lib/icons/Icons';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, Suspense, useState } from 'react';
import toast from 'react-hot-toast';

const Login = dynamic(() => import('@/components/Login'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Signup = dynamic(() => import('@/components/Signup'), { ssr: false });
const ForgotPassword = dynamic(() => import('@/components/ForgotPassword'), { ssr: false });
const CreatorSignup = dynamic(() => import('@/components/CreatorSignup'), { ssr: false });

export default function Auth() {
  const pathname = usePathname();
  const { login, signup, creatorSignup } = useAPI();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>, input: LoginInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');

    try {
      const { roles } = await login(input);

      const isCreator = roles.includes(UserRoles.CREATOR);

      const creatorAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_CREATOR_URL,
        pathname: '/analytics'
      });

      const fanAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_FAN_URL,
        pathname: '/home'
      });

      if (isCreator) return router.push(creatorAppUrl);

      toast.success('Logged in');
      return router.push(fanAppUrl);
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>, input: SignupInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');

    try {
      await signup(input);

      const fanAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_FAN_URL,
        pathname: '/analytics'
      });

      return router.push(fanAppUrl);
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatorSignup = async (e: FormEvent<HTMLFormElement>, input: CreatorSignupInput) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.onLine) return toast.error('You are currently offline!');
    try {
      await creatorSignup(input);

      const creatorAppUrl = buildSafeUrl({
        host: configService.NEXT_PUBLIC_CREATOR_URL,
        pathname: '/profile'
      });

      toast.success('Logged in');
      return router.push(creatorAppUrl);
    } catch (error) {
      toast.error('Something wrong happened!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-row items-center justify-center overflow-hidden">
          <RetroGrid angle={45} cellSize={80} opacity={0.1} lightLineColor="#000000" darkLineColor="#ffffff" />
        </div>
        <div>
          <div className="flex flex-col gap-6 overflow-hidden">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                {(() => {
                  switch (pathname) {
                    case AuthPaths.SIGNUP:
                      return <Signup loading={loading} handleSignup={handleSignup} />;

                    case AuthPaths.LOGIN:
                      return <Login loading={loading} handleLogin={handleLogin} />;

                    case AuthPaths.FORGOT_PASSWORD:
                      return <ForgotPassword />;

                    case AuthPaths.CREATOR_SIGNUP:
                      return <CreatorSignup handleCreatorSignUp={handleCreatorSignup} loading={loading} />;
                  }
                })()}
                <div className="bg-muted relative hidden content-center md:block">{Icons.appIcon(AppSizes.ICON_384)}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
