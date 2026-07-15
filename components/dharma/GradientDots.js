'use client';

import { motion } from 'framer-motion';

/**
 * Animated hex-grid dot pattern with a soft, hue-shifting color wash showing
 * through the gaps. Colors and hue-rotate range are tuned to the site's
 * charcoal/blue palette rather than the reference's full rainbow cycle.
 */
export default function GradientDots({
  dotSize = 7,
  spacing = 20,
  duration = 28,
  colorCycleDuration = 9,
  backgroundColor = 'var(--white)',
  style,
  ...props
}) {
  const hexSpacing = spacing * 1.732;

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, rgba(47, 95, 255, 0.5), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(92, 130, 255, 0.45), transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(22, 24, 28, 0.3), transparent 60%),
          radial-gradient(ellipse at 50% 50%, rgba(92, 130, 255, 0.35), transparent 60%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
        backgroundPosition: `
          0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          0% 0%,
          0% 0px
        `,
        ...style,
      }}
      animate={{
        backgroundPosition: [
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
          `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%`,
        ],
        // Narrow blue/purple range instead of a full 360deg rainbow cycle
        filter: ['hue-rotate(-15deg)', 'hue-rotate(20deg)', 'hue-rotate(-15deg)'],
      }}
      transition={{
        backgroundPosition: {
          duration,
          ease: 'linear',
          repeat: Infinity,
        },
        filter: {
          duration: colorCycleDuration,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      }}
      {...props}
    />
  );
}
