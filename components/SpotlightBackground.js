"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// Individual Spotlight element
const Spotlight = ({ className, ...props }) => {
  return (
    <motion.div
      className={`spotlight ${className}`}
      {...props}
    />
  );
};

// SpotlightBackground container
const SpotlightBackground = ({ children }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseXPercent = useMotionValue(50);
  const mouseYPercent = useMotionValue(50);
  const springX = useSpring(mouseXPercent, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseYPercent, { stiffness: 60, damping: 20, mass: 0.5 });
  const cursorLeft = useTransform(springX, (v) => `${v}%`);
  const cursorTop = useTransform(springY, (v) => `${v}%`);

  const handlePointerMove = (e) => {
    if (prefersReducedMotion || e.pointerType === "touch" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseXPercent.set(Math.min(100, Math.max(0, x)));
    mouseYPercent.set(Math.min(100, Math.max(0, y)));
  };

  return (
    <div
      className="spotlight-container"
      ref={containerRef}
      onPointerMove={handlePointerMove}
    >
      <div className="spotlight-overlay">
        <Spotlight
          initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: ["-50%", "-30%", "-70%", "-50%"],
                  y: ["-50%", "-70%", "-30%", "-50%"],
                  rotate: ["0deg", "15deg", "-15deg", "0deg"],
                }
          }
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="spotlight-left"
        />
        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "0deg" }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: ["0%", "20%", "-20%", "0%"],
                  y: ["0%", "30%", "10%", "0%"],
                  rotate: ["-20deg", "0deg", "20deg", "-20deg"],
                }
          }
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
          className="spotlight-mid"
        />
        <Spotlight
          initial={{ x: "0%", y: "0%", rotate: "10deg" }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: ["0%", "-30%", "10%", "0%"],
                  y: ["0%", "-20%", "20%", "0%"],
                  rotate: ["10deg", "-10deg", "25deg", "10deg"],
                }
          }
          transition={{
            duration: 18,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
          className="spotlight-right"
        />
        {!prefersReducedMotion && (
          <motion.div
            className="spotlight spotlight-cursor"
            style={{ left: cursorLeft, top: cursorTop }}
          />
        )}
      </div>
      <div className="spotlight-content">
        {children}
      </div>
    </div>
  );
};

export default SpotlightBackground;
