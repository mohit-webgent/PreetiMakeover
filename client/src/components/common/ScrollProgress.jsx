import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin pink-to-lavender reading progress bar pinned to the very top. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-salon-maroon via-salon-rose to-salon-lavender-dark"
    />
  );
}
