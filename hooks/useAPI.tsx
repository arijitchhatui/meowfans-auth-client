import { authCookieKey, authRefreshCookieKey, CreatorSignupInput, FetchMethods, LoginInput, SignupInput } from '@/lib/constants';
import { configService } from '@/util/config';
import { setCookie } from 'cookies-next';

const fetchRequest = async (input: { init: RequestInit; fetchMethod: FetchMethods; pathName: string }) => {
  const { init, fetchMethod, pathName } = input;
  const url = new URL(configService.NEXT_PUBLIC_BASE_URL);
  url.pathname = pathName;
  const res = await fetch(url, {
    ...init,
    method: fetchMethod
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

const useAPI = () => {
  const login = async (input: LoginInput) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/auth/login',
      init: {
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    setCookie(authCookieKey, data.accessToken, { domain: 'localhost' });
    setCookie(authRefreshCookieKey, data.refreshToken, { domain: 'localhost' });
    return data;
  };

  const signup = async (input: SignupInput) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/auth/fan-signup',
      init: {
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
    setCookie(authCookieKey, data.accessToken, { domain: 'localhost' });
    setCookie(authRefreshCookieKey, data.refreshToken, { domain: 'localhost' });
    return data;
  };

  const creatorSignup = async (input: CreatorSignupInput) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/auth/creator-signup',
      init: {
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
    setCookie(authCookieKey, data.accessToken, { domain: 'localhost' });
    setCookie(authRefreshCookieKey, data.refreshToken, { domain: 'localhost' });
    return data;
  };

  return {
    login,
    signup,
    creatorSignup
  };
};

export default useAPI;
