
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/',
    '/about(.*)',
    '/contact(.*)',
    '/csl-classes(.*)',
    '/events(.*)',
    '/members(.*)',
    '/resources(.*)',
    '/team(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
]);

const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
]);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
