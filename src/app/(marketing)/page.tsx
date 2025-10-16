export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <InterlockingKnotLogo />
    </div>
  );
}

function InterlockingKnotLogo() {
  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl"
    >
      <defs>
        {/* Gradient for top-right loop (cyan to blue) */}
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5DD9E8" />
          <stop offset="50%" stopColor="#7B9FE8" />
          <stop offset="100%" stopColor="#8B7FE8" />
        </linearGradient>

        {/* Gradient for top-left loop (purple to pink) */}
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A67FE8" />
          <stop offset="50%" stopColor="#C77FE8" />
          <stop offset="100%" stopColor="#E89FD8" />
        </linearGradient>

        {/* Gradient for bottom-left loop (pink to peach) */}
        <linearGradient id="grad3" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E8B89F" />
          <stop offset="50%" stopColor="#E8C8AF" />
          <stop offset="100%" stopColor="#E8A8C8" />
        </linearGradient>

        {/* Gradient for bottom-right loop (peach to purple) */}
        <linearGradient id="grad4" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8D8BF" />
          <stop offset="50%" stopColor="#B8A8E8" />
          <stop offset="100%" stopColor="#9888E8" />
        </linearGradient>
      </defs>

      {/* Top-right loop */}
      <path
        d="M 450 300 A 150 150 0 0 1 300 450 A 150 150 0 0 1 300 150 A 150 150 0 0 1 450 300 Z M 380 300 A 80 80 0 0 0 300 220 A 80 80 0 0 0 300 380 A 80 80 0 0 0 380 300 Z"
        fill="url(#grad1)"
      />

      {/* Top-left loop */}
      <path
        d="M 150 300 A 150 150 0 0 1 300 150 A 150 150 0 0 1 450 300 A 150 150 0 0 1 150 300 Z M 220 300 A 80 80 0 0 0 300 220 A 80 80 0 0 0 380 300 A 80 80 0 0 0 220 300 Z"
        fill="url(#grad2)"
      />

      {/* Bottom-left loop */}
      <path
        d="M 300 150 A 150 150 0 0 1 150 300 A 150 150 0 0 1 300 450 A 150 150 0 0 1 300 150 Z M 300 220 A 80 80 0 0 0 220 300 A 80 80 0 0 0 300 380 A 80 80 0 0 0 300 220 Z"
        fill="url(#grad3)"
      />

      {/* Bottom-right loop */}
      <path
        d="M 300 450 A 150 150 0 0 1 450 300 A 150 150 0 0 1 300 150 A 150 150 0 0 1 300 450 Z M 300 380 A 80 80 0 0 0 380 300 A 80 80 0 0 0 300 220 A 80 80 0 0 0 300 380 Z"
        fill="url(#grad4)"
      />

      {/* Center diamond */}
      <path
        d="M 300 270 L 330 300 L 300 330 L 270 300 Z"
        fill="#1a1a2e"
        opacity="0.8"
      />
    </svg>
  );
}
