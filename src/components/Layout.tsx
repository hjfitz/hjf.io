// todo: potentially move this to gatsby-browser.js
import React, { useEffect } from "react";
import { Link } from "gatsby";
import LogRocket from "logrocket";
import * as Sentry from "@sentry/gatsby";

import SEO from "./SEO";
import Nav from "./Nav";

import "../styles/main.scss";

import Footer from "./Footer";

console.log("%c hjf.io ", "background: #222; color: #fff; font-size: 32px");
console.log("Poking about? Check my code on GitHub!");
console.log("%c https://github.com/hjfitz?tab=repositories", "color: #1e3a8a");

interface LayoutProps {
  children: React.ReactNode;
}

let hasInitialized = false;
export function useErrorTracking() {
  useEffect(() => {
    if (hasInitialized) return;
    LogRocket.init("8ydpeu/hjfio");
    Sentry.init({
      dsn: "https://7b1e3179a9d045eeb04665283af84a3d@o877428.ingest.sentry.io/5836807",
      sampleRate: 1.0,
    });
    hasInitialized = true;
    LogRocket.getSessionURL((sessionURL) => {
      Sentry.configureScope((scope) => {
        scope.setExtra("sessionURL", sessionURL);
      });
    });
  }, []);
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <SEO />
    <div className="min-h-full text-black bg-white dark:bg-gray-800 dark:text-gray-300">
      <main className="container p-2 mx-auto md:py-8 md:px-16">
        <section className="pt-4 pb-8">
          <header className="pb-1 text-yellow-500">
            <Link to="/">hjf.io</Link>
          </header>
          <Nav />
        </section>
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default Layout;
