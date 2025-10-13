// "use client";

// import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";
// import LocomotiveScroll, { OnScrollEvent } from "locomotive-scroll";

// // Types for Locomotive Scroll
// interface LocomotiveScrollOptions {
//   smooth?: boolean;
//   smoothMobile?: boolean;
//   getDirection?: boolean;
//   getSpeed?: boolean;
//   class?: string;
//   initClass?: string;
//   scrollingClass?: string;
//   draggingClass?: string;
//   smoothClass?: string;
//   scrollbarClass?: string;
//   multiplier?: number;
//   firefoxMultiplier?: number;
//   touchMultiplier?: number;
//   scrollFromAnywhere?: boolean;
//   tablet?: { smooth?: boolean; breakpoint?: number };
//   smartphone?: { smooth?: boolean; breakpoint?: number };
//   [key: string]: unknown;
// }

// interface ScrollEventObject {
//   scroll: { x: number; y: number };
//   direction: string;
//   speed: number;
// }

// interface LocomotiveScrollContextType {
//   scroll: LocomotiveScroll | null;
//   isReady: boolean;
// }

// interface LocomotiveScrollProviderProps {
//   children: ReactNode;
//   options?: LocomotiveScrollOptions;
//   watch?: unknown[];
//   onLocationChange?: (obj: ScrollEventObject) => void;
//   onUpdate?: (obj: ScrollEventObject) => void;
// }

// // Create context
// const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>({
//   scroll: null,
//   isReady: false,
// });

// // Hook to use Locomotive Scroll
// export const useLocomotiveScroll = () => {
//   const context = useContext(LocomotiveScrollContext);
//   if (!context) {
//     throw new Error("useLocomotiveScroll must be used within LocomotiveScrollProvider");
//   }
//   return context;
// };

// // Locomotive Scroll Provider Component
// const LocomotiveScrollProvider = ({
//   children,
//   options = {},
//   watch = [],
//   onLocationChange,
//   onUpdate,
// }: LocomotiveScrollProviderProps) => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
//   const [isReady, setIsReady] = useState(false);

//   // Memoized callbacks to prevent useEffect re-runs
//   const memoizedOnLocationChange = useCallback(
//     (obj: ScrollEventObject) => onLocationChange?.(obj),
//     [onLocationChange]
//   );

//   const memoizedOnUpdate = useCallback(
//     (obj: ScrollEventObject) => onUpdate?.(obj),
//     [onUpdate]
//   );

//   // Default options with performance optimizations
//   const defaultOptions: LocomotiveScrollOptions = {
//     smooth: true,
//     smoothMobile: false, // Disable on mobile for better performance
//     getDirection: true,
//     getSpeed: true,
//     class: "is-reveal",
//     initClass: "has-scroll-init",
//     scrollingClass: "has-scroll-scrolling",
//     draggingClass: "has-scroll-dragging",
//     smoothClass: "has-scroll-smooth",
//     scrollbarClass: "c-scrollbar",
//     multiplier: 1,
//     firefoxMultiplier: 50,
//     touchMultiplier: 2,
//     scrollFromAnywhere: false,
//     tablet: {
//       smooth: false,
//       breakpoint: 1024,
//     },
//     smartphone: {
//       smooth: false,
//       breakpoint: 767,
//     },
//     ...options,
//   };

//   useEffect(() => {
//     let scroll: LocomotiveScroll | null = null;

//     const initializeLocomotiveScroll = async () => {
//       try {
//         if (scrollRef.current) {
//           scroll = new LocomotiveScroll({
//             el: scrollRef.current,
//             ...defaultOptions,
//           });

//           locomotiveScrollRef.current = scroll;

//           // Set up event listeners
//           if (memoizedOnLocationChange) {
//             scroll.on("call", (event) => {
//               memoizedOnLocationChange({
//                 scroll: { x: 0, y: 0 },
//                 direction: '',
//                 speed: 0,
//                 ...event
//               } as ScrollEventObject);
//             });
//           }

//           if (memoizedOnUpdate) {
//             scroll.on("scroll", (event: OnScrollEvent) => {
//               memoizedOnUpdate({
//                 scroll: event.scroll || { x: 0, y: 0 },
//                 direction: event.direction || '',
//                 speed: event.speed || 0,
//               });
//             });
//           }

//           // Mark as ready
//           setIsReady(true);
//           console.log("Locomotive Scroll initialized successfully");

//           // Force update after initialization
//           setTimeout(() => {
//             scroll?.update();
//             console.log("Locomotive Scroll updated");
//           }, 100);
//         }
//       } catch (error) {
//         console.error("Failed to initialize Locomotive Scroll:", error);
//       }
//     };

//     initializeLocomotiveScroll();

//     return () => {
//       if (scroll) {
//         setIsReady(false);
//         scroll.destroy();
//         locomotiveScrollRef.current = null;
//       }
//     };
//   }, [defaultOptions, memoizedOnLocationChange, memoizedOnUpdate]);

//   // Update scroll on dependency changes
//   useEffect(() => {
//     if (locomotiveScrollRef.current && isReady) {
//       locomotiveScrollRef.current.update();
//     }
//   }, [watch, isReady]);

//   // Update scroll on window resize
//   useEffect(() => {
//     if (!isReady) return;

//     const handleResize = () => {
//       if (locomotiveScrollRef.current) {
//         locomotiveScrollRef.current.update();
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isReady]);

//   const contextValue: LocomotiveScrollContextType = {
//     scroll: locomotiveScrollRef.current,
//     isReady,
//   };

//   return (
//     <LocomotiveScrollContext.Provider value={contextValue}>
//       <div ref={scrollRef} data-scroll-container>
//         {children}
//       </div>
//     </LocomotiveScrollContext.Provider>
//   );
// };

// export default LocomotiveScrollProvider;