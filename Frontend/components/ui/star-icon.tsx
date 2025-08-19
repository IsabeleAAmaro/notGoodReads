"use client"

import type React from "react"

type StarIconProps = {
  fill: "full" | "half" | "none"
  onClick: () => void
}

export function StarIcon({ fill }: { fill: "full" | "half" | "none" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <defs>
        <linearGradient id="half-fill" x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={fill === "full" ? "currentColor" : fill === "half" ? "url(#half-fill)" : "none"}
      />
    </svg>
  )
}
