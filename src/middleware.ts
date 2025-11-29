import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req: any) => {
      const isLoggedIn = !!req.auth;
      const { pathname } = req.nextUrl;

      // Check if it's an admin route (in any locale)
      // Matches /en/admin, /tr/admin, /admin (if not redirected yet)
      const isAdminRoute = pathname.includes('/admin');

      if (isAdminRoute && !isLoggedIn) {
            return Response.redirect(new URL("/api/auth/signin", req.nextUrl));
      }

      return intlMiddleware(req);
});

export const config = {
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
};
