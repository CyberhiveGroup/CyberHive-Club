
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/',
    '/about',
    '/csl-classes',
    '/events',
    '/resources',
    '/contact',
    '/admin',
    '/sign-in(.*)',
    '/sign-up(.*)',
]);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
