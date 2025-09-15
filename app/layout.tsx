import { fetchRequest } from '@/hooks/useAPI';
import { AppConfig } from '@/lib/app.config';
import { authCookieKey, FetchMethods, JwtUser, UserRoles } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Theme } from '@radix-ui/themes';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  metadataBase: new URL(AppConfig.siteUrl),
  title: {
    template: AppConfig.template,
    default: AppConfig.title
  },
  alternates: {
    canonical: AppConfig.canonical
  },
  manifest: AppConfig.manifest,
  applicationName: AppConfig.applicationName,
  description: AppConfig.description,
  openGraph: {
    siteName: AppConfig.site_name,
    title: AppConfig.title,
    description: AppConfig.description,
    type: AppConfig.type as 'website',
    locale: AppConfig.locale,
    url: AppConfig.siteUrl
  },
  generator: 'Next.js',
  keywords: AppConfig.keywords,
  icons: AppConfig.icons
} satisfies Metadata;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--primary-font',
  style: 'normal'
});
export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

export const verifyAccessToken = async (token?: string) => {
  const data = await fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });
  return data as JwtUser;
};

export const handleValidateAndRedirect = async () => {
  try {
    const cookiesList = await cookies();
    const accessToken = cookiesList.get(authCookieKey)?.value;
    const jwtUser = await verifyAccessToken(accessToken);
    if (jwtUser) return await redirectToApp(jwtUser);
  } catch {
    return;
  }
};

export const redirectToApp = async (jwtUser: JwtUser) => {
  switch (jwtUser.roles[0]) {
    case UserRoles.CREATOR:
      return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_CREATOR_URL, pathname: '/profile' }));
    case UserRoles.FAN:
      return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_FAN_URL, pathname: '/home' }));
  }
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  await handleValidateAndRedirect();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="generator" content={metadata.generator} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/icons/app_icon_20x20.svg" />
        {AppConfig.icons.map(({ rel, url }, idx) => (
          <link key={idx} rel={rel} href={url} />
        ))}
      </head>
      <body className={cn(inter.variable, 'overscroll-none')}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-wrapper"
          containerStyle={{}}
          toastOptions={{
            className: 'single-toaster',
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '5px 5px',
              fontSize: '14px'
            },
            success: { style: { background: '#000', color: '#fff' } },
            error: { style: { background: '#b33234', color: '#fff' } }
          }}
        />
        <Theme>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            value={{ light: 'light', dark: 'dark' }}
          >
            <main className="w-full">{children}</main>
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  );
}
