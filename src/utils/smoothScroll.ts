import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

/**
 * Detects if the client is running Windows to optimize trackpad physics.
 * Windows Precision Touchpads benefit from slightly dampened wheel acceleration
 * to prevent runaway scrolling and provide a weighted, luxurious feel.
 */
export const isWindowsPlatform = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Win/i.test(navigator.userAgent || '') || 
    (navigator as unknown as { userAgentData?: { platform?: string } }).userAgentData?.platform === 'Windows';
};

/**
 * Initializes buttery-smooth scrolling tailored specifically for Windows laptop trackpads,
 * external precision mice, and high-refresh displays.
 */
export const initSmoothScroll = (): Lenis => {
  if (lenisInstance) return lenisInstance;

  const isWin = isWindowsPlatform();

  lenisInstance = new Lenis({
    // Natural exponential deceleration mimicking physical surface friction
    duration: isWin ? 1.15 : 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // On Windows trackpads, wheelMultiplier 0.82 prevents sudden burst overshoots
    wheelMultiplier: isWin ? 0.82 : 0.95,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: false, // We drive Lenis directly from GSAP's high-precision RAF ticker
  });

  // Keep GSAP ScrollTrigger perfectly synchronized on every scroll tick
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Bind to GSAP's internal ticker for lockstep frame updates
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);

  // Disable lagSmoothing so frame drops do not result in abrupt scroll position leaps
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

/**
 * Access the active Lenis singleton.
 */
export const getLenis = (): Lenis | null => lenisInstance;

/**
 * Smoothly scrolls to an element or Y position using Lenis physics.
 */
export const smoothScrollTo = (
  target: number | string | HTMLElement,
  options?: { offset?: number; duration?: number; onComplete?: () => void }
): void => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete: options?.onComplete,
    });
  } else {
    // Graceful fallback if Lenis is not active
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    options?.onComplete?.();
  }
};

/**
 * Pauses smooth scrolling (useful when modal overlays or full-screen menus open).
 */
export const stopScroll = (): void => {
  lenisInstance?.stop();
};

/**
 * Resumes smooth scrolling.
 */
export const startScroll = (): void => {
  lenisInstance?.start();
};

/**
 * Cleans up listeners and destroys the instance.
 */
export const destroySmoothScroll = (): void => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
