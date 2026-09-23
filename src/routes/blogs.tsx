import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactElement } from "react";

/** Tracks reading progress against the website's desktop scroller or page. */
const useReadingProgress = (enabled: boolean): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const container = document.querySelector<HTMLElement>(
      "[data-website-scroll-container]",
    );

    const updateProgress = (): void => {
      const usesPageScroll =
        !container ||
        window.getComputedStyle(container).overflowY === "visible";
      const scrollTop = usesPageScroll
        ? window.scrollY
        : (container?.scrollTop ?? 0);
      const scrollHeight = usesPageScroll
        ? document.documentElement.scrollHeight
        : (container?.scrollHeight ?? 0);
      const viewportHeight = usesPageScroll
        ? window.innerHeight
        : (container?.clientHeight ?? 0);
      const available = scrollHeight - viewportHeight;

      setProgress(available > 0 ? Math.min(scrollTop / available, 1) : 0);
    };

    const scrollTarget: Window | HTMLElement =
      !container || window.getComputedStyle(container).overflowY === "visible"
        ? window
        : container;

    updateProgress();
    scrollTarget.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      scrollTarget.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [enabled]);

  return progress;
};

/** Provides shared navigation and reading progress for blog routes. */
const BlogsLayout = (): ReactElement => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isListing = pathname === "/blogs" || pathname === "/blogs/";
  const progress = useReadingProgress(!isListing);

  return (
    <div className="relative min-h-full py-8 max-[760px]:pt-3 max-[760px]:pb-12">
      {!isListing ? (
        <div
          className="fixed top-0 right-0 left-72 z-40 h-0.5 bg-transparent max-md:left-0"
          role="progressbar"
          aria-label="Article reading progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className="bg-website-green block h-full origin-left transition-transform duration-100 motion-reduce:transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      ) : null}

      <nav className="font-website-display mb-10 text-xs tracking-tighter uppercase">
        <Link
          className="text-website-text-muted hover:text-website-interactive no-underline transition-colors"
          search={{ mode: "website" }}
          to={isListing ? "/" : "/blogs"}
        >
          ← {isListing ? "portfolio" : "all posts"}
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default BlogsLayout;
