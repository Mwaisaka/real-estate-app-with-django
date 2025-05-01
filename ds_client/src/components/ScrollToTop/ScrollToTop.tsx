
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Ensure the scroll happens after the DOM is rendered
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [location]);

  // Also ensure that we scroll to top on initial page load (refresh)
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return null;
}

export default ScrollToTop;