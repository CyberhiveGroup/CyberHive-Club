
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  
  // Redirect sign-up to sign-in to prevent new user registration
  if (req.nextUrl.pathname.startsWith('/sign-up')) {
    const signInUrl = new URL('/sign-in', req.url)
    return Response.redirect(signInUrl)
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
