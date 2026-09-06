import React from 'react';

export const Sparkle = ({ className = "", color = "currentColor", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
    style={{ animation: 'spin-pulse 4s linear infinite' }}
  >
    <style>
      {`
        @keyframes spin-pulse {
          0% { transform: rotate(0deg) scale(0.9); opacity: 0.7; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
          100% { transform: rotate(360deg) scale(0.9); opacity: 0.7; }
        }
      `}
    </style>
    <path
      d="M12 1C12 7.07513 16.9249 12 23 12C16.9249 12 12 16.9249 12 23C12 16.9249 7.07513 12 1 12C7.07513 12 12 7.07513 12 1Z"
      fill={color}
    />
  </svg>
);

export const Squiggle = ({ className = "", color = "currentColor", width = 100, height = 20 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <style>
      {`
        .draw-squiggle {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-squiggle-anim 1.5s ease-out forwards;
          animation-delay: 0.2s;
        }
        @keyframes draw-squiggle-anim {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
    <path
      className="draw-squiggle"
      d="M2 10C15 20 25 0 35 10C45 20 55 0 65 10C75 20 85 0 98 10"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDoodle = ({ className = "", color = "currentColor", width = 40, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <style>
      {`
        .draw-arrow {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-arrow-anim 1.5s ease-out forwards;
          animation-delay: 0.5s;
        }
        @keyframes draw-arrow-anim {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
    <path
      className="draw-arrow"
      d="M10 30C15 25 25 15 30 10M30 10C25 10 18 12 15 15M30 10C30 15 28 22 25 25"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UnderlineDoodle = ({ className = "", color = "currentColor", color2 = "var(--color-secondary)" }) => (
  <svg
    viewBox="0 0 100 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <style>
      {`
        .draw-underline {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-underline-anim 2s ease-in forwards;
        }
        .draw-underline-2 {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-underline-anim 1s ease-in forwards;
          animation-delay: 0.2s;
        }
        @keyframes draw-underline-anim {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
    <path
      className="draw-underline"
      d="M2 10 Q 50 18 98 8"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="draw-underline-2"
      d="M5 22 Q 45 30 95 20"
      stroke={color2}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

export const CircleDoodle = ({ className = "", color = "currentColor", size = 60 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <style>
      {`
        .draw-circle {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-circle-anim 1.2s ease-out forwards;
          animation-delay: 0.2s;
        }
        @keyframes draw-circle-anim {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
    <path
      className="draw-circle"
      d="M30 5 C45 3, 58 12, 57 28 C56 42, 42 56, 26 55 C12 54, 3 40, 5 25 C7 12, 18 4, 32 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SwirlDoodle = ({ className = "", color = "currentColor", size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <style>
      {`
        .draw-swirl {
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
          animation: draw-swirl-anim 1.5s ease-out forwards;
          animation-delay: 0.3s;
        }
        @keyframes draw-swirl-anim {
          to { stroke-dashoffset: 0; }
        }
      `}
    </style>
    <path
      className="draw-swirl"
      d="M20 20 C 18 18, 14 18, 14 22 C 14 26, 22 28, 26 24 C 30 20, 28 12, 20 10 C 10 8, 4 18, 6 28 C 8 40, 24 40, 34 32"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


