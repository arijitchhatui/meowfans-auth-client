import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isValidEmail, isValidPassword } from '@/util/helpers';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import OtherLogin from './OtherLogin';
import { LoginInput } from '@/lib/constants';
import { Header } from './Header';

interface Props {
  handleLogin: (e: FormEvent<HTMLFormElement>, input: LoginInput) => unknown;
  loading: boolean;
}

const LoginForm: React.FC<Props> = ({ handleLogin, loading }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(!email || !password || !isValidEmail(email) || !isValidPassword(password));
  }, [email, password]);

  return (
    <form className="p-6 md:p-8" onSubmit={(e) => handleLogin(e, { email, password })}>
      <div className="flex flex-col gap-6">
        <Header />
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="******"
            required
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button disabled={disabled} type="submit" className="w-full">
          {loading && <Loader2Icon className="animate-spin" />}
          Login
        </Button>
        <OtherLogin />
        <div className="text-center text-sm flex flex-col">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
