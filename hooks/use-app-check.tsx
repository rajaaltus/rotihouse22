"use client";

import { useEffect, useState } from "react";
import {getAppCheck} from '../src/config/firebase'

/**
 * A hook that ensures Firebase App Check is initialized
 * Returns a boolean indicating whether App Check is ready
 */
export const useAppCheck = () => {
  const [isAppCheckReady, setIsAppCheckReady] = useState(false);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    try {
      // Initialize App Check
      const appCheck = getAppCheck();

      // If we have an appCheck instance, mark as ready
      if (appCheck) {
        setIsAppCheckReady(true);
      }
    } catch (error) {
      console.error("Error initializing App Check in hook:", error);
    }
  }, []);

  return isAppCheckReady;
};

export default useAppCheck;
