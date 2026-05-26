import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except Next.js internals, static files,
    // and the file-based metadata routes (app/icon.tsx, apple-icon.tsx, etc.)
    "/((?!_next|_vercel|studio|icon|apple-icon|opengraph-image|twitter-image|manifest|robots|sitemap|.*\\..*).*)",
  ],
};
