import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import "./ScrollToTop.css";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);

        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  }, [pathname, hash]);

  return (
    <motion.div
      key={pathname}
      className="page-transition"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    />
  );
}

export default ScrollToTop;