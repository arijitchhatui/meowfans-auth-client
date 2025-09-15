export const configService = {
  get NEXT_PUBLIC_API_URL() {
    return process.env.NEXT_PUBLIC_API_URL!;
  },
  get NEXT_PUBLIC_CREATOR_URL() {
    return process.env.NEXT_PUBLIC_CREATOR_URL!;
  },
  get NEXT_PUBLIC_FAN_URL() {
    return process.env.NEXT_PUBLIC_FAN_URL!;
  },
  get NEXT_PUBLIC_AUTH_URL() {
    return process.env.NEXT_PUBLIC_AUTH_URL!;
  }
};
