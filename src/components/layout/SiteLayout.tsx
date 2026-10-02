import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

/** Restores the top of the document on route change, as a browser would. */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

const SiteLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <ScrollToTop />
    <a
      href="#main"
      className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ChatWidget />
  </div>
);

export default SiteLayout;
