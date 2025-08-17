"use client"

import { useRef, useEffect, useState } from "react"

interface MarqueeProps {
  text: string
}

export function Marquee({ text }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth)
    }
  }, [text])

  return (
    <div
      ref={ref}
      className={`whitespace-nowrap overflow-hidden ${isOverflowing ? "marquee" : ""}`}
    >
      <span className={isOverflowing ? "marquee-content" : ""}>{text}</span>
      {isOverflowing && <span className="marquee-content">{text}</span>}
    </div>
  )
}
