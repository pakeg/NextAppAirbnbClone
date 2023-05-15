export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/trips",
    "/reservation",
    "/reservation/:path*",
    "/properties",
    "/properties/:path*",
    "/listings",
    "/listings/:path*",
    "/favorites",
    "/favorites/:path*",
  ],
};
