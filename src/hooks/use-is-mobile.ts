import { useCallback, useEffect, useState } from "react";

// Constants for better maintainability
const MOBILE_BREAKPOINT = 768;
const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/** ==============================================================================================
 * Custom hook to check if the device is mobile
 * @returns {boolean} True if the device is mobile, false otherwise
 *  ==============================================================================================
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const checkIsMobile = useCallback(() => {
    const isMobileDevice = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(isMobileDevice);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);

    mediaQuery.addEventListener("change", checkIsMobile);
    window.addEventListener("resize", checkIsMobile);

    checkIsMobile();

    return () => {
      mediaQuery.removeEventListener("change", checkIsMobile);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [checkIsMobile]);

  return !!isMobile;
}
