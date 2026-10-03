import { useState, useEffect } from "react";

export function useVisibility(threshold = 20) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (scrollDifference < threshold) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isVisible;
}
