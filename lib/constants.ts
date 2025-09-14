export const authenticatedPaths = [
  '/home',
  '/notifications',
  '/assets',
  '/channels',
  '/analytics',
  '/profile',
  '/profile/creator',
  '/profile/fan',
  '/subscriptions',
  '/subscriptions/plan',
  '/cards',
  '/more'
];

export enum FetchMethods {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  GET = 'GET'
}

export const authCookieKey = '_accessToken';
export const authRefreshCookieKey = '_refreshToken';

export enum UserRoles {
  FAN = 'fan',
  ADMIN = 'admin',
  SUPER_VIEWER = 'super_viewer',
  CREATOR = 'creator'
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  fullName: string;
}

export const THEME = '_theme';

export enum AppSizes {
  ICON_1024 = '1024',
  ICON_512 = '512',
  ICON_384 = '384',
  ICON_256 = '256',
  ICON_196 = '196',
  ICON_144 = '144',
  ICON_96 = '96',
  ICON_72 = '72',
  ICON_48 = '48',
  ICON_36 = '36'
}

export enum AuthPaths {
  SIGNUP = '/signup',
  LOGIN = '/login',
  CREATOR_SIGNUP = '/creator-signup',
  FORGOT_PASSWORD = '/forgot-password',
  GOOGLE_LOGIN = '/google',
  APPLE_LOGIN = '/apple',
  META_LOGIN = '/meta'
}

export enum FileType {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
  DOCUMENT = 'document'
}

export enum MediaType {
  PROFILE_MEDIA = 'profileMedia',
  MESSAGE_MEDIA = 'messageMedia',
  POST_MEDIA = 'postMedia'
}

export enum ImageType {
  BLURRED = 'blurred',
  ORIGINAL = 'original',
  RESIZED = 'resized'
}

export interface UploadMediaInput {
  mediaType: MediaType;
}

export interface CreatorSignupInput {
  email: string;
  password: string;
  fullName: string;
  username: string;
}
