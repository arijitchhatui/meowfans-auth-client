'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from './Header';
import OtherLogin from './OtherLogin';

const CreatorSignup = () => {
  const [activeTab, setActiveTab] = useState<string>('account');
  const router = useRouter();

  return (
    <form className="p-6 md:p-8 flex flex-col">
      <div className="flex flex-col gap-6">
        <Header />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-1">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-fullname">Full name</Label>
              <Input id="tabs-demo-fullname" placeholder="Meow User" type="text" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-email">Email</Label>
              <Input id="tabs-demo-email" placeholder="meow@gmail.com" type="email" />
            </div>
            <Button type="button" className="w-full mt-7" onClick={() => setActiveTab('password')}>
              Next
            </Button>
          </TabsContent>

          <TabsContent value="password" className="space-y-1">
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-username">Username</Label>
              <Input id="tabs-demo-username" type="text" placeholder="@meowfan" autoComplete="username" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tabs-demo-new-password">Password</Label>
              <Input id="tabs-demo-new-password" type="password" autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full mt-7">
              Signup
            </Button>
          </TabsContent>
        </Tabs>

        <OtherLogin />

        <div className="text-center text-sm flex flex-col">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreatorSignup;
